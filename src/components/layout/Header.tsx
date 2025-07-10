'use client';
import { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
// import Logo from '../Logo';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import Navigation from '../Navigation';
import Sidebar from './Sidebar';

type PageTitleProps = {
  subtitle: string;
  title: string;
};

export default function Header({ pageTitle }: { pageTitle?: PageTitleProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="flex h-[80px] items-center justify-between px-6 bg-[#0d0d0d]">
        {/* 왼쪽: 로고 */}
        <Image
        src={logo}
        alt='logo' />

        {/* 오른쪽: 네비게이션 + 토글 버튼 */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:block"><Navigation /></div>
          
          <button
            className="bg-[#0d0d0d] flex h-[52px] w-[52px] items-center justify-center rounded-full transition"
            aria-label="사이드바 열기"
            onClick={() => setSidebarOpen(true)}
          >
            <BiMenuAltLeft className="text-main h-10 w-10" />
          </button>
        </div>
      </header>

      {pageTitle && (
        <section className="text-center bg-[#0d0d0d] pb-10 lg:pb-20">
          <p className="text-xs lg:text-base text-white">{pageTitle.subtitle}</p>
          <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
              {pageTitle.title}
            </span>
          </h1>
        </section>
      )}

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
