'use client';
import { useRouter } from 'next/navigation';
import Logo from '../common/Logo';
import { IoIosArrowBack } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import MenuBar from './MenuBar';
import { useState } from 'react';

export default function DashboardHeader() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          <Logo className="relative ml-2 h-[24px] w-[63px] lg:h-[44px] lg:w-[117px]" />
          <button
            className="from-main/20 bg-gradient-to-b to-[#FF58D8]/20 lg:rounded-full lg:p-1"
            aria-label="사이드바 토글 버튼"
            onClick={() => setSidebarOpen(true)}
          >
            <BiMenuAltLeft className="text-main -mr-2 h-8 w-8 lg:mr-0" />
          </button>
        </nav>
      </header>

      {/* 사이드바 오버레이 */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 반투명 배경 */}
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => setSidebarOpen(false)}
            aria-label="오버레이 닫기"
          />
          {/* 실제 사이드바 */}
          <aside className="relative z-50">
            <MenuBar close={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
