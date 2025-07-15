import Image from 'next/image';
import email from '../assets/images/email.svg';

export default function EmailCheck() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[var(--color-black)] px-5 text-[var(--color-gray-3)]">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-150 flex-col items-center">
          <Image src={email} alt="" sizes="200" />
          <span className="font-bold">이메일을 입력하고 인증 해주세요.</span>
          <div className="h-5" />
          <input
            type="text"
            placeholder="이메일을 입력 해주세요"
            className="h-12.5 w-full max-w-150 rounded-[5px] bg-[var(--color-gray-default)] px-4 focus:outline-2 focus:outline-[var(--color-link)]"
          />
          {/* <div className="flex w-full max-w-150 justify-between gap-3">
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
            <input
              type="text"
              className="aspect-square w-full max-w-20 rounded-[5px] bg-[#313131] text-center focus:outline-2 focus:outline-[#1cebb9b3]"
            />
          </div> */}
          <button
            type="button"
            className="mt-5 mb-[13px] hidden w-full max-w-150 cursor-pointer rounded-[5px] bg-[var(--color-link)] p-4 font-bold text-[var(--color-gray-default)] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:block"
          >
            이메일 인증
          </button>
        </div>
        <div className="mt-5 flex h-5 items-center gap-2 text-[13px]">
          {/* <span>이메일 전송이 안 됐나요?</span>
          <button className="cursor-pointer text-[#1CEBB9]">
            이메일 재전송
          </button> */}
        </div>
      </div>
      <button
        type="button"
        className="mb-[13px] w-full max-w-150 cursor-pointer rounded-[5px] bg-[#1CEBB9] p-4 font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:hidden"
      >
        이메일 인증
      </button>
    </div>
  );
}
