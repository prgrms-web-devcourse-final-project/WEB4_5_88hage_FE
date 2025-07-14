'use client';
import { useRouter } from 'next/navigation';
import Logo from '../common/Logo';
import { IoIosArrowBack } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';

export default function DashboardHeader() {
  const router = useRouter();
  const previousHistory = () => {
    router.back();
  };
  return (
    <>
      <header className="fixed top-0 right-0 z-10 w-full min-w-[335px] lg:min-w-[1240px]">
        {/* 모바일에서만 블러 배경 */}
        <div className="absolute inset-0 h-full w-full backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none" />
        <nav className="relative flex w-full items-center justify-between px-[20px] pt-[10px] lg:items-start lg:pt-[24px]">
          <button
            className="lg:hidden"
            onClick={() => {
              previousHistory();
            }}
          >
            <IoIosArrowBack fill="#ffffff" size={24} />
          </button>
          <Logo className="relative h-[24px] w-[63px] lg:h-[44px] lg:w-[117px]" />
          <button
            className="rounded-full p-1 lg:bg-[#414141]"
            aria-label="사이드바 토글 버튼"
          >
            <BiMenuAltLeft className="text-main -mr-2 h-8 w-8 lg:mr-0" />
          </button>
        </nav>
      </header>
    </>
  );
}
