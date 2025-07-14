'use client';
import { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import Navigation from '../Navigation';
import MenuBar from './MenuBar';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* 헤더 전체 컨테이너 */}
      <header className="flex flex-col fixed z-30 top-0 w-full">
        {/* 네비게이션 영역 */}
        <div className="flex h-[50px] items-center justify-between px-6 lg:h-[65px]">
          {/* 로고 */}
          <div className="relative h-[30px] w-[70px] lg:h-[40px] lg:w-[110px]">
            <Image
              src={logo}
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>

          {/* 네비 + 사이드바 토글 */}
          <nav className="flex items-center gap-8">
            <div className="hidden lg:block">
              <Navigation />
            </div>
            <button
              className="lg:bg-gray-8 lg:rounded-full lg:p-1"
              aria-label="사이드바 열기"
              onClick={() => setSidebarOpen(true)}
            >
              <BiMenuAltLeft className="text-main -mr-2 h-8 w-8 lg:mr-0" />
            </button>
          </nav>
        </div>
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
            <MenuBar />
          </aside>
        </div>
      )}
    </>
  );
}
