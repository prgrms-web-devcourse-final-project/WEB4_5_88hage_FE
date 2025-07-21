'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DarkModeToggle from '../DarkModeToggle';
import cloud from '@/assets/images/cloud-face.png.png';
import getWeather from '@/lib/api/weather';
import Link from 'next/link';
import { useAuthStore } from '@/stores/UseAuthStore';

const logoutItem = [
  { label: '로그인', value: 'login' },
  { label: '회원가입', value: 'signup' },
  { label: '알림', value: 'signup' },
  { label: '행사', value: 'event' },
  { label: '모임', value: 'gathering' },
  { label: '고객지원', value: 'notice' },
  { label: '모임 글 작성', value: 'gathering/create' },
  { label: '문의 글 작성', value: 'inquiry/create' },
]

const loginItem = [
  { label: '로그아웃' },
  { label: '내 프로필', value: 'user/profile' },
  { label: '행사', value: 'event' },
  { label: '모임', value: 'gathering' },
  { label: '고객지원', value: 'notice' },
]



export default function MenuBar() {
  const [active, setActive] = useState('');
  const [weather,setWeather] = useState<number|undefined>(undefined);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  const NAV_ITEMS = isAuthenticated ? loginItem : logoutItem;

  useEffect(()=>{
    const getNowWeather = async ()=>{
      const result = await getWeather();
      if(result === undefined) return
      setWeather(result);
    }
    getNowWeather();
  },[])

  return (
    <aside className="fixed top-0 right-0 z-50 flex h-screen w-[335px] flex-col p-5 backdrop-blur-[20px] lg:w-[480px] lg:bg-[rgba(0,0,0,0.6)] lg:p-15">
      <div className="absolute top-3 right-6 flex">
        <DarkModeToggle />
        <button className="bg-gray-7 ml-3 flex items-center justify-around rounded-full p-1">
          <X className="text-main h-8 w-8" />
        </button>
      </div>
      <div className="mt-[50px] lg:mt-0">
        <Image
          src={weather! > 0 ? cloud : "sun-face.svg"}
          width={40}
          height={40}
          alt="sun"
          className="my-2"
        />
        <div className="h2 font-semibold text-white">
          <span className="text-main">홍길동</span>님 환영해요!
          <br />
          {weather! > 0 ? '실내에서 놀기 좋은 날이네요!':'실외 활동하기 좋은 날이에요!'}
        </div>

        <div className="my-8 w-[60px] border text-white" />

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                className={`h2 group ml-[-15px] flex w-full items-center py-1 text-left font-semibold transition ${
                  active === item.label ? 'text-main font-bold' : 'text-white'
                } hover:text-main`}
                onClick={() => setActive(item.label)}
                type="button"
              >
                <span
                  className={`mr-2 h-1 w-1 rounded-full transition-all ${
                    active === item.label ? 'bg-main' : 'bg-transparent'
                  }`}
                />
                <Link href={`/${item.value}`}>{item.label}</Link>
              </button>

              {/* '알람' 다음에만 줄 추가 */}
              {item.label === '알람' && (
                <div className="my-6 w-[60px] border text-white" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
