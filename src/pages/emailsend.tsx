// "use client";
import Image from 'next/image';
import EmailImage from '@/assets/images/email.svg';

export default function Emailsend() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-[#232323] px-6 pt-[140px] text-center text-white md:justify-center md:pt-0">
      <div className="flex w-full max-w-[620px] flex-col items-center">
        <div className="mb-6">
          <Image src={EmailImage} alt="email icon" width={200} height={200} />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#1CEBB9] md:mb-4 md:text-3xl">
          이메일 인증이 필요합니다.
        </h1>

        <p className="mb-8 text-xs leading-relaxed text-[#bdbdbd] md:mb-10 md:text-sm md:leading-loose">
          가입하신 이메일로 인증 메일을 보냈습니다.&nbsp;
          <br className="block md:hidden" />
          메일함을 확인하고 인증을 완료해 주세요.
        </p>

        <button className="mt-6 mb-12 h-12 w-full max-w-[510px] rounded-md bg-[#313131] text-base font-bold text-[#bdbdbd] md:h-16">
          인증 메일 재발송
        </button>
      </div>
    </div>
  );
}
