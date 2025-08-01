'use client';
import { useEffect, useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import Navigation from '../Navigation';
import MenuBar from './MenuBar';
import Logo from '../common/Logo';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 헤더 전체 컨테이너 */}
      <header className="fixed top-0 z-30 flex w-full flex-col">
        {/* 네비게이션 영역 */}
        <div
          className={[
            'flex h-[50px] items-center justify-between px-6 backdrop-blur-sm lg:h-[65px]',
            isScrolled ? 'bg-black/30' : 'bg-transparent'
          ].join(' ')}
        >
          {/* 로고 */}
          <div className="relative mt-6 h-[40px] w-[80px] lg:h-[50px] lg:w-[120px]">
            <Logo />
          </div>

          {/* 네비 + 사이드바 토글 */}
          <nav className="flex items-center gap-8">
            <div className="hidden lg:block">
              <Navigation />
            </div>
            <button
              className="from-main/20 bg-transparent to-[#FF58D8]/20 lg:rounded-full lg:bg-gradient-to-b lg:p-1"
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
            <MenuBar close={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
