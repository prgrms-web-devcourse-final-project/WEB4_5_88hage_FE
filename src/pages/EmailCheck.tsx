import Image from 'next/image';
import email from '../assets/images/email.svg';

export default function EmailCheck() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[var(--color-black)] px-5 text-[var(--color-gray-3)]">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-150 flex-col items-center">
          <Image src={email} alt="" sizes="200" />
          <span className="text-xl font-bold text-[#c0c0c0]">
            이메일을 입력하고 인증 해주세요.
          </span>
          <div className="h-5" />
          <input
            type="text"
            placeholder="이메일을 입력 해주세요"
            className="bg-gray-5 focus:outline-link placeholder:text-gray-disabled h-12.5 w-full max-w-150 rounded-[5px] px-4 placeholder:font-semibold focus:outline-2"
          />
          {/* <div className="flex w-full max-w-150 justify-between gap-3">
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
          </div> */}
          <button
            type="button"
            className="signup-btn mt-5 mb-[13px] hidden lg:block"
          >
            이메일 인증
          </button>
        </div>
        {/* <div className="mt-5 flex h-5 items-center gap-2 text-[14px] font-semibold">
          <span>이메일 전송이 안 됐나요?</span>
          <button className="cursor-pointer text-[#1CEBB9]">
            이메일 재전송
          </button>
        </div> */}
      </div>
      <button type="button" className="signup-btn mb-[13px] lg:hidden">
        이메일 인증
      </button>
    </div>
  );
}
