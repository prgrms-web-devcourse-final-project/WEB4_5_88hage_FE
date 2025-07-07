'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import DarkModeToggle from '../DarkModeToggle';

const NAV_ITEMS = [
  '로그아웃',
  '내 프로필',
  '알람',
  '이사',
  '청소',
  '도배',
  '인테리어',
];

export default function Sidebar() {
  const [active, setActive] = useState('');

  return (
    <aside className="fixed top-0 right-0 z-50 flex h-screen w-[335px] flex-col p-5 lg:w-[450px] lg:p-15">
      <div className="absolute top-3 right-6 flex">
        <DarkModeToggle />
        <button className="bg-gray-7 ml-3 flex h-[52px] w-[52px] items-center justify-around rounded-full">
          <X className="text-main h-10 w-10" />
        </button>
      </div>
      <div className="mt-[50px] lg:mt-0">
        <Image
          src="sun-face.svg"
          width={40}
          height={40}
          alt="sun"
          className="my-2"
        />
        <div className="t3 font-semibold text-white">
          <span className="text-main">홍길동</span>님 환영해요!
          <br />
          오늘은 나가 놀기 좋은 날이네요
        </div>

        <div className="my-8 w-[60px] border text-white" />

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item}>
              <button
                className={`t3 group ml-[-15px] flex w-full items-center py-1 text-left font-semibold transition ${
                  active === item ? 'text-main font-bold' : 'text-white'
                } hover:text-main`}
                onClick={() => setActive(item)}
                type="button"
              >
                <span
                  className={`mr-2 h-1 w-1 rounded-full transition-all ${
                    active === item ? 'bg-main' : 'bg-transparent'
                  }`}
                />
                {item}
              </button>

              {/* '알람' 다음에만 줄 추가 */}
              {item === '알람' && (
                <div className="my-6 w-[60px] border text-white" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
