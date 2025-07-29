import Image from "next/image";
import { toast } from "react-toastify";
import chatbot from "@/assets/images/chatbot.png";

type ChatbotButtonProps = {
  onClick: () => void;
  isLoggedIn: boolean;
};

export default function ChatbotButton({ onClick, isLoggedIn }: ChatbotButtonProps) {
  return (
    <button
      type="button"
      className="w-[40px] h-[40px] pt-[4px] pl-[7px] lg:w-[80px] lg:pt-[6px] lg:pl-[9px] lg:h-[80px] rounded-[100%] bg-gradient-to-b from-main to-text fixed bottom-[80px] right-[26px] lg:bottom-[50px] lg:right-[30px] z-100 pointer-events-auto"
      onClick={() => {
        if (!isLoggedIn) {
          toast.info("로그인 후 이용하실 수 있습니다.");
          return;
        }
        onClick();
      }}
    >
      <Image alt="ai챗봇" src={chatbot} className="w-[24px] h-[24px] lg:w-[54px] lg:h-[54px]" priority />
    </button>
  );
}