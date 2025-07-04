"use client";
import Image from "next/image";
import EmailImage from "@/assets/email.svg";

export default function Emailsend() {
  return (
    <div className="min-h-screen bg-[#232323] text-white flex flex-col items-center justify-start md:justify-center px-6 pt-[140px] md:pt-0 text-center">
  <div className="w-full max-w-[620px] flex flex-col items-center">
    <div className="mb-6">
      <Image src={EmailImage} alt="email icon" width={200} height={200} />
    </div>

    <h1 className="text-2xl text-[#1CEBB9] font-bold mb-3 md:text-3xl md:mb-4">
      이메일 인증이 필요합니다.
    </h1>

    <p className="text-xs leading-relaxed text-[#bdbdbd] mb-8 md:text-sm md:leading-loose md:mb-10">
      가입하신 이메일로 인증 메일을 보냈습니다.&nbsp;
      <br className="block md:hidden" />
      메일함을 확인하고 인증을 완료해 주세요.
    </p>

    <button
      className="w-full max-w-[510px] h-12 md:h-16 bg-[#313131] text-[#bdbdbd] text-base font-bold rounded-md mt-6 mb-12"
    >
      인증 메일 재발송
    </button>
  </div>
</div>
  );
}