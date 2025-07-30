import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ArrowUp } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/assets/styles/datepicker.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

// 1. 타입 정의
type ContentItem = {
  id: number;
  contentTitle: string;
  address: string;
  age: string;
  fee: string;
  category: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  poster: string;
  url: string;
};

type GroupItem = {
  id: number;
  title: string;
  imageUrl: string;
  simpleExplain: string;
  placeName: string;
};

type RecommendResponse = {
  code: string;
  message: string;
  data: {
    contents?: ContentItem[];
    groups?: GroupItem[];
  };
};

type ChatbotModalProps = {
  onClose: () => void;
};

type Message = {
  type: 'bot' | 'user';
  text: string;
  recommendGroups?: (ContentItem | GroupItem)[];
};

type ChatHistory = {
  user: string;
  ai: string;
};

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const router = useRouter();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: '안녕! 나는 여가 생활 추천 AI 큐큐야!\n서울에 있는 컨텐츠나 모임을 지금 너가 원하는 상태에 따라 추천해줄게.\n\n모임, 컨텐츠(행사,장소) 둘 중 하나를 선택해줘.',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [eventType, setEventType] = useState<'GROUP' | 'CONTENT' | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showRecommendModal, setShowRecommendModal] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [allRecommendGroups, setAllRecommendGroups] = useState<
    (ContentItem | GroupItem)[]
  >([]);
  const [recommendOffset, setRecommendOffset] = useState<number>(2);
  const [hasRecommended, setHasRecommended] = useState<boolean>(false);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const text = inputMessage.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { type: 'user', text }]);
    setInputMessage('');

    const payload = {
      chatBotHistory: chatHistory,
      userMessage: text,
      eventType,
    };

    try {
      const res = await fetch(`${API}/api/chatBot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: result.data || '오류가 발생했습니다!' },
      ]);

      setChatHistory((prev) => [
        ...prev,
        { user: text, ai: result.data || '오류가 발생했습니다!' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: '서버와 통신에 실패했습니다ㅜ' },
      ]);
    }
  };

  const handleSummary = async () => {
    const trimmedInput = inputMessage.trim();

    const lastUserMsg =
      trimmedInput ||
      (chatHistory.length ? chatHistory[chatHistory.length - 1].user : '');

    const fullHistory =
      trimmedInput || chatHistory.length === 0
        ? chatHistory
        : chatHistory.slice(0, -1);

    const payload = {
      chatBotHistory: fullHistory,
      userMessage: lastUserMsg,
      eventType,
    };

    try {
      await fetch(`${API}/api/chatBot/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      setShowRecommendModal(true);
    } catch (error) {
      console.error('요약 요청 실패', error);
    }
  };

  const handleRecommend = async () => {
    if (!address || !startDate || !endDate) return;
    const recommendUrl =
      eventType === 'CONTENT'
        ? `${API}/api/chatBot/recommend/content`
        : `${API}/api/chatBot/recommend/group`;

    const recommendPayload = {
      address,
      startTime: startDate.toISOString().slice(0, 19),
      endTime: endDate.toISOString().slice(0, 19),
    };

    try {
      const res = await fetch(recommendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(recommendPayload),
      });
      const data: RecommendResponse = await res.json();

      setShowRecommendModal(false);

      const isGroup = eventType === 'GROUP';
      const resultArray = isGroup ? data.data?.groups : data.data?.contents;

      if (data.data && Array.isArray(resultArray) && resultArray.length > 0) {
        setAllRecommendGroups(resultArray);
        setRecommendOffset(2);
        setHasRecommended(true);
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: '',
            recommendGroups: resultArray.slice(0, 2),
          },
        ]);
      } else {
        setAllRecommendGroups([]);
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: '추천 결과가 없습니다.' },
        ]);
        setHasRecommended(true);
      }
    } catch {
      toast.error('추천 요청 실패!');
    }
  };

  const handleShowMore = () => {
    if (recommendOffset >= allRecommendGroups.length) {
      toast.info('챗봇추천은 여기까지입니다.');
      return;
    }
    const nextOffset = Math.min(recommendOffset + 2, allRecommendGroups.length);
    setRecommendOffset(nextOffset);
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: '',
        recommendGroups: allRecommendGroups.slice(recommendOffset, nextOffset),
      },
    ]);
  };

  return (
    <div className="fixed right-[128px] bottom-[90px] z-200 flex h-[519px] w-[300px] flex-col items-center rounded-[5px] bg-[#CAEAE2] shadow-lg">
      <div className="relative flex h-[519px] w-[300px] flex-col overflow-hidden rounded-xl bg-[#CAEAE2] shadow-lg">
        <div className="flex items-center justify-between bg-transparent px-[10px] py-2">
          <button onClick={onClose}>
            <ChevronLeft size={18} />
          </button>
          <span className="text-[14px] font-semibold text-[#333333]">
            AI 큐큐✨
          </span>
          <span style={{ width: 24 }}></span>
        </div>
        <div
          ref={chatBoxRef}
          className="chatbot-scrollbar flex flex-1 flex-col overflow-y-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'} mb-[5px] ${idx === 0 ? 'mt-[14px]' : ''}`}
            >
              {msg.text && (
                <div
                  className={`max-w-[242px] rounded-[5px] px-4 py-2 text-[12px] whitespace-pre-line shadow ${
                    msg.type === 'bot'
                      ? 'ml-[15px] rounded-tl-none bg-white text-black'
                      : 'mt-[5px] mr-[15px] mb-[5px] rounded-tr-none bg-white text-black'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {/* 타입가드 분기 */}
              {msg.recommendGroups && (
                <div className="mt-2 ml-[15px] flex w-full flex-col gap-3">
                  {msg.recommendGroups.map((item) => {
                    if ('title' in item) {
                      // GroupItem
                      const group = item as GroupItem;
                      return (
                        <div
                          key={group.id}
                          onClick={() => router.push(`/gathering/${group.id}`)}
                          className="w-[180px] cursor-pointer overflow-hidden rounded-[12px] bg-white shadow-lg transition hover:shadow-xl"
                        >
                          <Image
                            className="h-32 w-full object-cover"
                            src={group.imageUrl}
                            alt={group.title}
                          />
                          <div className="px-4 py-3">
                            <div className="mb-1 text-[16px] font-bold">
                              {group.title}
                            </div>
                            <p className="mb-1 text-[14px] text-gray-700">
                              {group.simpleExplain}
                            </p>
                            <p className="text-[13px] text-gray-400">
                              {group.placeName}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      // ContentItem
                      const content = item as ContentItem;
                      return (
                        <div
                          key={content.id}
                          onClick={() => router.push(`/event/${content.id}`)}
                          className="w-[180px] cursor-pointer overflow-hidden rounded-[12px] bg-white shadow-lg transition hover:shadow-xl"
                        >
                          <Image
                            className="h-32 w-full object-cover"
                            src={content.poster}
                            alt={content.contentTitle}
                          />
                          <div className="px-4 py-3">
                            <div className="mb-1 text-[16px] font-bold">
                              {content.contentTitle}
                            </div>
                            {/* <p className="text-gray-700 text-[14px] mb-1">{content.reason}</p> */}
                            <p className="text-[13px] text-gray-400">
                              {content.address}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}

          {!eventType && (
            <div className="mt-[5px] ml-[15px] flex flex-row gap-2">
              <button
                className="h-[25px] w-[80px] rounded-[5px] bg-[#01E0AA] text-[13px] font-semibold text-white"
                onClick={() => {
                  setEventType('GROUP');
                  setMessages((m) => [
                    ...m,
                    {
                      type: 'bot',
                      text: '문화/운동/음식/자기개발/게임/여행/예술 이런 카테고리들이 있는데 참고해서 너가 원하는 활동을 말해줘!',
                    },
                  ]);
                }}
              >
                모임
              </button>
              <button
                className="h-[25px] w-[100px] rounded-[5px] bg-[#01E0AA] text-[13px] font-semibold text-white"
                onClick={() => {
                  setEventType('CONTENT');
                  setMessages((m) => [
                    ...m,
                    {
                      type: 'bot',
                      text: '연극/무용/클래식/국악/대중음악/서커스/뮤지컬/관광지/문화시설/레포츠 이런 카테고리들이 있는데 참고해서 너가 원하는 활동을 말해줘!',
                    },
                  ]);
                }}
              >
                컨텐츠
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full justify-center pt-2 pb-3">
          {!hasRecommended && (
            <button
              onClick={handleSummary}
              className="flex h-[40px] w-[280px] items-center justify-center rounded-lg bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] text-sm font-semibold text-white"
            >
              현재 대화 내용 기반으로 추천 받기 👍
            </button>
          )}
          {hasRecommended && (
            <button
              className="flex h-[40px] w-[280px] items-center justify-center rounded-lg bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] text-sm font-semibold text-white"
              onClick={handleShowMore}
            >
              추천 더 받기
            </button>
          )}
        </div>

        <div className="flex w-full items-center justify-center border-t border-[#eee] bg-white py-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            className="ml-[5px] h-[30px] w-[300px] rounded bg-transparent px-3 text-[12px] outline-none placeholder:text-[#b1b1b1]"
            placeholder="질문을 입력 하세요"
          />
          <button
            className="from-text to-main mr-[10px] flex h-[20px] w-[25px] items-center justify-center rounded-full bg-gradient-to-b shadow-md"
            onClick={handleSend}
          >
            <ArrowUp size={14} color="#fff" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {showRecommendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex w-[380px] flex-col items-center rounded-2xl bg-white px-8 py-8 shadow-xl">
            <h2 className="mb-6 text-lg font-bold text-gray-900">
              추천 조건 입력
            </h2>
            <input
              className="focus:ring-main mb-4 w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 placeholder:text-[13px] focus:ring-2 focus:outline-none"
              value={address}
              placeholder="서울특별시 ㅇㅇ구 ㅇㅇ동 형태로 입력해주세요"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="mb-3 w-full">
              <label className="mb-1 block text-sm text-gray-800">
                원하시는 시작기간을 선택하세요
              </label>
              <DatePicker
                locale="ko"
                dateFormat="yyyy-MM-dd a h:mm"
                shouldCloseOnSelect
                showTimeSelect
                timeIntervals={60}
                minDate={new Date()}
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                placeholderText="시작일"
                className="focus:ring-main w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 placeholder-gray-400 placeholder:text-[13px] focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="mb-5 w-full">
              <label className="mb-1 block text-sm text-gray-800">
                원하시는 종료기간을 선택하세요
              </label>
              <DatePicker
                locale="ko"
                dateFormat="yyyy-MM-dd a h:mm"
                shouldCloseOnSelect
                showTimeSelect
                timeIntervals={60}
                minDate={startDate || new Date()}
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                placeholderText="종료일"
                className="focus:ring-main w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 placeholder-gray-400 placeholder:text-[13px] focus:ring-2 focus:outline-none"
              />
            </div>
            <button
              className="bg-text hover:bg-main-dark mt-2 w-full rounded-lg py-3 text-base font-bold text-white transition"
              onClick={handleRecommend}
              disabled={!address || !startDate || !endDate}
            >
              추천받기
            </button>
            <button
              className="mt-3 text-sm text-gray-500 underline"
              onClick={() => setShowRecommendModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
