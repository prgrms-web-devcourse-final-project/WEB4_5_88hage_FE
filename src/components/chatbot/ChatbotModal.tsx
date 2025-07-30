/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ArrowUp } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/datepicker.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  type: "bot" | "user";
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
      type: "bot",
      text:
        "안녕! 나는 여가 생활 추천 AI 큐큐야!\n서울에 있는 컨텐츠나 모임을 지금 너가 원하는 상태에 따라 추천해줄게.\n\n모임, 컨텐츠(행사,장소) 둘 중 하나를 선택해줘.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [eventType, setEventType] = useState<"GROUP" | "CONTENT" | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [showRecommendModal, setShowRecommendModal] = useState<boolean>(false);

  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [allRecommendGroups, setAllRecommendGroups] = useState<(ContentItem | GroupItem)[]>([]);
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

    setMessages((prev) => [...prev, { type: "user", text }]);
    setInputMessage("");

    const payload = {
      chatBotHistory: chatHistory,
      userMessage: text,
      eventType,
    };

    try {
      const res = await fetch(`${API}/api/chatBot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: result.data || "오류가 발생했습니다!" },
      ]);

      setChatHistory((prev) => [
        ...prev,
        { user: text, ai: result.data || "오류가 발생했습니다!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "서버와 통신에 실패했습니다ㅜ" },
      ]);
    }
  };

  const handleSummary = async () => {
    const trimmedInput = inputMessage.trim();

    const lastUserMsg =
      trimmedInput || (chatHistory.length ? chatHistory[chatHistory.length - 1].user : "");

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      setShowRecommendModal(true);
    } catch (error) {
      console.error("요약 요청 실패", error);
    }
  };

  const handleRecommend = async () => {
    if (!address || !startDate || !endDate) return;
    const recommendUrl =
      eventType === "CONTENT"
        ? `${API}/api/chatBot/recommend/content`
        : `${API}/api/chatBot/recommend/group`;

    const recommendPayload = {
      address,
      startTime: startDate.toISOString().slice(0, 19),
      endTime: endDate.toISOString().slice(0, 19),
    };

    try {
      const res = await fetch(recommendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(recommendPayload),
      });
      const data: RecommendResponse = await res.json();

      setShowRecommendModal(false);

      const isGroup = eventType === "GROUP";
      const resultArray = isGroup ? data.data?.groups : data.data?.contents;

      if (data.data && Array.isArray(resultArray) && resultArray.length > 0) {
        setAllRecommendGroups(resultArray);
        setRecommendOffset(2);
        setHasRecommended(true);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "",
            recommendGroups: resultArray.slice(0, 2),
          },
        ]);
      } else {
        setAllRecommendGroups([]);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "추천 결과가 없습니다." },
        ]);
        setHasRecommended(true);
      }
    } catch {
      toast.error("추천 요청 실패!");
    }
  };

  const handleShowMore = () => {
    if (recommendOffset >= allRecommendGroups.length) {
      toast.info("챗봇추천은 여기까지입니다.");
      return;
    }
    const nextOffset = Math.min(recommendOffset + 2, allRecommendGroups.length);
    setRecommendOffset(nextOffset);
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        text: "",
        recommendGroups: allRecommendGroups.slice(recommendOffset, nextOffset),
      },
    ]);
  };

  return (
    <div className="fixed bottom-[90px] right-[128px] z-200 w-[300px] h-[519px] rounded-[5px] bg-[#CAEAE2] shadow-lg flex flex-col items-center">
      <div className="relative bg-[#CAEAE2] rounded-xl w-[300px] h-[519px] flex flex-col shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-[10px] py-2 bg-transparent">
          <button onClick={onClose}>
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold text-[14px] text-[#333333]">AI 큐큐✨</span>
          <span style={{ width: 24 }}></span>
        </div>
        <div
          ref={chatBoxRef}
          className="flex-1 flex flex-col overflow-y-auto chatbot-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"} mb-[5px] ${idx === 0 ? "mt-[14px]" : ""}`}
            >
              {msg.text && (
                <div
                  className={`text-[12px] whitespace-pre-line px-4 py-2 shadow rounded-[5px] max-w-[242px]
                    ${msg.type === "bot"
                      ? "bg-white text-black ml-[15px] rounded-tl-none"
                      : "bg-white text-black mr-[15px] rounded-tr-none mt-[5px] mb-[5px]"}`}
                >
                  {msg.text}
                </div>
              )}

              {/* 타입가드 분기 */}
              {msg.recommendGroups && (
                <div className="flex flex-col gap-3 mt-2 ml-[15px] w-full">
                  {msg.recommendGroups.map((item) => {
                    if ("title" in item) {
                      // GroupItem
                      const group = item as GroupItem;
                      return (
                        <div
                          key={group.id}
                          onClick={() => router.push(`/gathering/${group.id}`)}
                          className="w-[180px] rounded-[12px] overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
                        >
                          <img
                            className="w-full h-32 object-cover"
                            src={group.imageUrl}
                            alt={group.title}
                          />
                          <div className="px-4 py-3">
                            <div className="font-bold text-[16px] mb-1">{group.title}</div>
                            <p className="text-gray-700 text-[14px] mb-1">{group.simpleExplain}</p>
                            <p className="text-gray-400 text-[13px]">{group.placeName}</p>
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
                          className="w-[180px] rounded-[12px] overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
                        >
                          <img
                            className="w-full h-32 object-cover"
                            src={content.poster}
                            alt={content.contentTitle}
                          />
                          <div className="px-4 py-3">
                            <div className="font-bold text-[16px] mb-1">{content.contentTitle}</div>
                            {/* <p className="text-gray-700 text-[14px] mb-1">{content.reason}</p> */}
                            <p className="text-gray-400 text-[13px]">{content.address}</p>
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
            <div className="flex flex-row gap-2 mt-[5px] ml-[15px]">
              <button
                className="bg-[#01E0AA] text-white font-semibold w-[80px] h-[25px] rounded-[5px] text-[13px]"
                onClick={() => {
                  setEventType("GROUP");
                  setMessages((m) => [
                    ...m,
                    {
                      type: "bot",
                      text:
                        "문화/운동/음식/자기개발/게임/여행/예술 이런 카테고리들이 있는데 참고해서 너가 원하는 활동을 말해줘!",
                    },
                  ]);
                }}
              >
                모임
              </button>
              <button
                className="bg-[#01E0AA] text-white font-semibold w-[100px] h-[25px] rounded-[5px] text-[13px]"
                onClick={() => {
                  setEventType("CONTENT");
                  setMessages((m) => [
                    ...m,
                    {
                      type: "bot",
                      text:
                        "연극/무용/클래식/국악/대중음악/서커스/뮤지컬/관광지/문화시설/레포츠 이런 카테고리들이 있는데 참고해서 너가 원하는 활동을 말해줘!",
                    },
                  ]);
                }}
              >
                컨텐츠
              </button>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center pt-2 pb-3">
          {!hasRecommended && (
            <button
              onClick={handleSummary}
              className="w-[280px] h-[40px] rounded-lg bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] text-white text-sm font-semibold flex items-center justify-center">
              현재 대화 내용 기반으로 추천 받기 👍
            </button>
          )}
          {hasRecommended && (
            <button
              className="w-[280px] h-[40px] rounded-lg bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] text-white text-sm font-semibold flex items-center justify-center"
              onClick={handleShowMore}
            >
              추천 더 받기
            </button>
          )}
        </div>

        <div className="w-full flex justify-center items-center border-t border-[#eee] bg-white py-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            className="w-[300px] h-[30px] px-3 text-[12px] rounded outline-none bg-transparent placeholder:text-[#b1b1b1] ml-[5px]"
            placeholder="질문을 입력 하세요"
          />
          <button
            className="w-[25px] h-[20px] flex items-center justify-center rounded-full bg-gradient-to-b from-text to-main shadow-md mr-[10px]"
            onClick={handleSend}
          >
            <ArrowUp size={14} color="#fff" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {showRecommendModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-8 w-[380px] flex flex-col items-center">
            <h2 className="mb-6 text-lg font-bold text-gray-900">추천 조건 입력</h2>
            <input
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main text-gray-700 placeholder:text-[13px]"
              value={address}
              placeholder="서울특별시 ㅇㅇ구 ㅇㅇ동 형태로 입력해주세요"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="w-full mb-3">
              <label className="block text-sm text-gray-800 mb-1">원하시는 시작기간을 선택하세요</label>
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
                className="placeholder-gray-400 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-main placeholder:text-[13px]"
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-sm text-gray-800 mb-1">원하시는 종료기간을 선택하세요</label>
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
                className="placeholder-gray-400 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-main placeholder:text-[13px]"
              />
            </div>
            <button
              className="w-full bg-text hover:bg-main-dark transition py-3 rounded-lg text-white font-bold text-base mt-2"
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