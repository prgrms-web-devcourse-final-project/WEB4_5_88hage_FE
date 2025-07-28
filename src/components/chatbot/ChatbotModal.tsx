import { useState } from "react";
import { ChevronLeft , ArrowUp  } from "lucide-react";

export default function ChatbotModal({ onClose }) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed
        bottom-[90px]
        right-[128px]
        z-200
        w-[300px]
        h-[519px]
        rounded-[5px]
        bg-[#CAEAE2]
        shadow-lg
        flex flex-col
        items-center">
      <div className="relative bg-[#CAEAE2] rounded-xl w-[300px] h-[519px] flex flex-col shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-[10px] py-2 bg-transparent">
          <button onClick={onClose}><ChevronLeft size={18} /></button>
          <span className="font-semibold text-[14px] text-[#333333]">AI 큐큐✨</span>
          <span style={{ width: 24 }}></span>
        </div>
        <div className="flex-1 px-5 py-2 overflow-y-auto"></div>
        <div className="w-full flex justify-center pt-2 pb-3">
  <button
    className="w-[280px] h-[40px] rounded-lg bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] text-white text-sm font-semibold flex items-center justify-center"
  >
    현재 대화 내용 기반으로 추천 받기 👍
  </button>
</div>
        <div className="w-full flex justify-center items-center border-t border-[#eee] bg-white py-2">
  <input
    type="text"
    value={message}
    onChange={e => setMessage(e.target.value)}
    className="
      w-[300px] h-[30px]
      px-3 text-[12px] rounded
      outline-none bg-transparent
      placeholder:text-[#b1b1b1] ml-[5px]
    "
    placeholder="질문을 입력 하세요"
  />
  <button
  className="
    w-[25px] h-[20px]
    flex items-center justify-center
    rounded-full
    bg-gradient-to-b from-text to-main
    shadow-md
    mr-[10px]
  "
>
  <ArrowUp size={14} color="#fff" strokeWidth={2.5} />
</button>
</div>
      </div>
    </div>
  );
}