import { useState, useEffect } from "react";
import { ChevronLeft, ArrowUp, Image } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/datepicker.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ChatbotModal({ onClose }) {
  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "안녕! 나는 여가 생활 추천 AI 큐큐야!\n서울에 있는 컨텐츠나 모임을 지금 너가 원하는 상태에 따라 추천해줄게.\n\n모임, 컨텐츠(행사,장소) 둘 중 하나를 선택해줘.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [eventType, setEventType] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [showRecommendModal, setShowRecommendModal] = useState(false);

  // 추천조건 입력값
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 추천 결과 관리
  const [allRecommendGroups, setAllRecommendGroups] = useState([]);
  const [recommendOffset, setRecommendOffset] = useState(2); // 몇 개까지 노출중인지
  const [hasRecommended, setHasRecommended] = useState(false); // 추천 한 번이라도 받았는지
const API = process.env.NEXT_PUBLIC_API_URL;
  // 챗봇 대화 전송
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
const API = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${API}/api/chatBot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // 요약 버튼 클릭 시: 요약API 호출 후 추천조건 모달 오픈
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
      setShowRecommendModal(true); // 추천조건 모달 열기!
    } catch (error) {
      console.error("요약 요청 실패", error);
    }
  };

  // 추천조건 입력 후 추천API 호출 (groups/contents 자동 분기!)
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
      const data = await res.json();
      setShowRecommendModal(false);

      // 여기서 분기! (groups/contents)
      const isGroup = eventType === "GROUP";
      const resultArray = isGroup ? data.data?.groups : data.data?.contents;

      if (data.data && Array.isArray(resultArray) && resultArray.length > 0) {
        setAllRecommendGroups(resultArray);
        setRecommendOffset(2); // 항상 처음 2개부터!
        setHasRecommended(true); // 추천 버튼 → 더 받기로 변경
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

  // "추천 더 받기" 버튼 클릭 핸들러 (항상 2개씩 추가, 새 메시지로 쌓음)
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

  useEffect(() => {
    // debug 용
    // console.log("chatHistory state:", chatHistory);
  }, [chatHistory]);

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
        <div className="flex-1 flex flex-col overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"} mb-[5px] ${idx === 0 ? "mt-[14px]" : ""}`}
            >
              {/* 일반 텍스트 메시지 */}
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

              {/* 추천 결과 카드 메시지 */}
              {msg.recommendGroups && (
  <div className="flex flex-col gap-3 mt-2 ml-[15px] w-full">
    {msg.recommendGroups.map((item) => {
      // 모임(GROUP)
      if (item.title) {
        return (
          <div
            key={item.id}
            onClick={() => router.push(`/gathering/${item.id}`)}
            className="w-[180px] rounded-[12px] overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
          >
            <Image
              className="w-full h-32 object-cover"
              src={item.imageUrl}
              alt={item.title}
            />
            <div className="px-4 py-3">
              <div className="font-bold text-[16px] mb-1">{item.title}</div>
              <p className="text-gray-700 text-[14px] mb-1">{item.simpleExplain}</p>
              <p className="text-gray-400 text-[13px]">{item.placeName}</p>
            </div>
          </div>
        );
      }
      // 컨텐츠(CONTENT)
      return (
        <div
          key={item.id}
          onClick={() => router.push(`/event/${item.id}`)}
          className="w-[180px] rounded-[12px] overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition"
        >
          <Image
            className="w-full h-32 object-cover"
            src={item.poster}
            alt={item.contentTitle}
          />
          <div className="px-4 py-3">
            <div className="font-bold text-[16px] mb-1">{item.contentTitle}</div>
            {/* <p className="text-gray-700 text-[14px] mb-1">{item.reason}</p> */}
            <p className="text-gray-400 text-[13px]">{item.address}</p>
          </div>
        </div>
      );
    })}
  </div>
)}

            </div>
          ))}

          {/* 모임/컨텐츠 선택 초기 버튼 */}
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

        {/* 버튼: 추천 전/후 분기 */}
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

        {/* 인풋 */}
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

      {/* 추천 조건 입력 모달 */}
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
                onChange={setStartDate}
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
                onChange={setEndDate}
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