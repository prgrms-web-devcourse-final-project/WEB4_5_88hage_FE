// "use client";
import Image from "next/image";
import Clap from "@/assets/images/clap.svg";

export default function SignupClap() {
  return (
    <div className="min-h-screen bg-[#232323] text-white flex flex-col items-center justify-start md:justify-center px-6 pt-[140px] md:pt-12 text-center">
  <div className="w-full max-w-[620px] flex flex-col items-center">
    <div className="mb-6">
      <Image src={Clap} alt="email icon" width={200} height={200} />
    </div>

    <h1 className="text-2xl md:text-3xl text-white mb-3 md:mb-4">
  환영해요! <span className="text-[#1CEBB9]">홍길동</span>님
</h1>

    <p className="text-xs font-normal leading-relaxed text-[#c0c0c0] mb-8 md:text-sm md:leading-loose md:mb-10">
      이제 다양한 서비스를 자유롭게 이용하실 수 있어요.
    </p>

    <button
      className="w-full max-w-[450px] h-12 md:h-16 bg-[#313131] text-[#bdbdbd] text-base font-bold rounded-md mt-6 mb-12"
    >
      홈으로 가기
    </button>
  </div>
</div>
  );
}