'use client';
import Logo from '@/components/common/Logo';
import Sidebar from '@/components/layout/Sidebar';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:ml-[270px]">
        <header className="fixed top-0 right-0 z-10 w-full min-w-[335px] lg:min-w-[1240px]">
          {/* 모바일에서만 블러 배경 */}
          <div className="absolute inset-0 h-full w-full backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none" />
          <nav className="relative flex w-full items-center justify-between px-[20px] pt-[10px] lg:items-start lg:pt-[24px]">
            <button className="lg:hidden">
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
        <main className="flex-1 px-[112px] py-[28px] lg:pt-5">
          <h1 className="mb-[20px] text-[16px] font-extrabold text-white lg:mb-10 lg:text-[24px] xl:text-[32px]">
            안녕하세요, 관리자님 👋🏼
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}
