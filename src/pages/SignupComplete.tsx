'use client';
import Image from 'next/image';
import completeImg from '@/assets/images/signup_complete.png';
import { useRouter } from 'next/navigation';

export default function SignupComplete() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/');
      }}
      className="flex h-screen w-screen flex-col items-center justify-between px-5 py-[14px] lg:justify-center"
    >
      <div className="lg:hidden"></div>
      <div className="flex w-150 max-w-full flex-col items-center text-[#fff]">
        <div>
          <Image src={completeImg} alt="completeImg" />
        </div>
        <div className="mt-6 mb-2.5 flex gap-4 text-[32px]">
          <span>환영해요!</span>
          <span>
            <strong className="text-main">홍길동</strong>님
          </span>
        </div>
        <div>이제 다양한 서비스를 자유롭게 이용하실 수 있어요.</div>
        <button className="signup-btn mt-[90px] hidden lg:block">
          홈으로 가기
        </button>
      </div>
      <button className="signup-btn lg:hidden">홈으로 가기</button>
    </form>
  );
}
