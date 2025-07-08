'use client';
import { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import Logo from '../Logo';
import Navigation from '../Navigation';
import Sidebar from './Sidebar';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex h-[80px] items-center justify-between px-6">
        {/* 왼쪽: 로고 */}
        <Logo />

        {/* 오른쪽: 네비게이션 + 토글 버튼 */}
        <div className="flex items-center gap-8">
          <Navigation />
          <button
            className="bg-gray-8 flex h-[52px] w-[52px] items-center justify-center rounded-full transition"
            aria-label="사이드바 열기"
            onClick={() => setSidebarOpen(true)}
          >
            <BiMenuAltLeft className="text-main h-10 w-10" />
          </button>
        </div>
      </header>

      {/* 사이드바 오버레이 */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 오버레이 배경 */}
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setSidebarOpen(false)}
            aria-label="오버레이 닫기"
          />
          {/* 사이드바 */}
          <aside className="relative z-50">
            <Sidebar />
          </aside>
        </div>
      )}
    </>
  );
}
