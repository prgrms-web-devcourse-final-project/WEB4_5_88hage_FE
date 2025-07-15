'use client';

import {
  CircleUserRound,
  NotebookPen,
  Calendar,
  List,
  Users,
  MessagesSquare,
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { icon: CircleUserRound, label: '내 프로필' },
  { icon: NotebookPen, label: '문의 내역' },
  { icon: Users, label: '마이 클럽' },
  { icon: Calendar, label: '일정 관리' },
  { icon: List, label: '내 게시물' },
  { icon: MessagesSquare, label: '내 메신저' },
];

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {/* 모바일 하단 네비게이션 */}
      <div className="bg-gray-7 fixed bottom-0 left-0 z-50 flex h-[70px] w-full items-center justify-around lg:hidden">
        {NAV_ITEMS.map(({ icon: Icon }, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full transition ${
              selectedIndex === idx
                ? 'bg-main text-black'
                : 'bg-[#2c2c2c] text-white'
            }`}
          >
            <Icon size={22} />
          </button>
        ))}
      </div>

      {/* PC 사이드바 */}
      <div className="bg-gray-7 hidden w-[270px] lg:fixed lg:top-0 lg:left-0 lg:flex lg:h-screen lg:flex-col lg:justify-start">
        <div className="py-30">
          <nav className="flex flex-col">
            {NAV_ITEMS.map(({ icon: Icon, label }, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`flex items-center gap-3 rounded px-7 py-4 text-[18px] transition ${
                  selectedIndex === idx
                    ? 'bg-main text-black'
                    : 'hover:bg-gray-8 text-white'
                }`}
              >
                <Icon size={22} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
