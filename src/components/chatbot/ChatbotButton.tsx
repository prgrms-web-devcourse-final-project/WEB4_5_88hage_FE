import Image from "next/image";
import chatbot from "@/assets/images/chatbot.png"

export default function ChatbotButton(){
  return (
    <>
    <button className="w-[40px] h-[40px] pt-[4px] pl-[7px] lg:w-[80px] lg:pt-[6px] lg:pl-[9px] lg:h-[80px] rounded-[100%] bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] fixed bottom-[80px] right-[26px] lg:bottom-[50px] lg:right-[30px] z-100">
        <Image alt="ai챗봇" src={chatbot} className="w-[24px] h-[24px] lg:w-[54px] lg:h-[54px]"  priority/>
    </button>
    </>
  );
};