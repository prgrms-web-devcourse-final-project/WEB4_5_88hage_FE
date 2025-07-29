'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import DarkModeToggle from '../DarkModeToggle';
import cloud from '@/assets/images/cloud-face.png.png';
import getWeather from '@/lib/api/weather';
import Link from 'next/link';
import { useAuthStore } from '@/stores/UseAuthStore';
import { useRouter } from 'next/navigation';

const logoutItem = [
  { label: '로그인', value: 'login' },
  { label: '회원가입', value: 'signup' },
  // { label: '알림', value: 'signup' },
  { label: '행사', value: 'event' },
  { label: '모임', value: 'gathering' },
  { label: '고객지원', value: 'notice' },
];

const loginItem = [
  { label: '로그아웃' },
  { label: '내 프로필', value: 'user/profile' },
  { label: '알림', value: 'notification' },
  { label: '행사', value: 'event' },
  { label: '모임', value: 'gathering' },
  { label: '고객지원', value: 'notice' },
  { label: '모임 글 작성', value: 'gathering/create' },
  { label: '문의 글 작성', value: 'inquiry/create' },
];

export default function MenuBar({ close }: { close: () => void }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [active, setActive] = useState('');
  const [weather, setWeather] = useState<number | undefined>(undefined);
  const [notiCount, setNotiCount] = useState(0);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const NAV_ITEMS = isAuthenticated ? loginItem : logoutItem;

  const getNotificationCount = async () => {
    if (user) {
      const response = await fetch(
        `${API}/api/notifications/unread-count?email=${user.email}`,
      );
      const { data } = await response.json();
      setNotiCount(data);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, [isAuthenticated === true, user]);

  useEffect(() => {
    const getNowWeather = async () => {
      const result = await getWeather();
      if (result === undefined) return;
      setWeather(result);
    };
    getNowWeather();
  }, []);

  const bottomBorder = ['알림', '고객지원', '회원가입'];

  return (
    <aside className="fixed top-0 right-0 z-50 flex h-screen w-[335px] flex-col p-5 backdrop-blur-[20px] lg:w-[480px] lg:bg-[rgba(0,0,0,0.6)] lg:p-15">
      <div className="absolute top-3 right-6 flex">
        {/* <DarkModeToggle /> */}
        <button
          type="button"
          onClick={close}
          className="bg-gray-7 ml-3 flex items-center justify-around rounded-full p-1"
        >
          <X className="text-main h-8 w-8" />
        </button>
      </div>
      <div className="mt-[50px] lg:mt-0">
        <Image
          src={weather! > 0 ? cloud : 'sun-face.svg'}
          width={40}
          height={40}
          alt="sun"
          className="my-2"
        />
        <div className="h2 flex flex-col font-semibold text-white">
          {isAuthenticated && user && (
            <div>
              <span className="text-main">{user.nickname}</span>님 환영해요!
            </div>
          )}
          <div>
            {weather! > 0
              ? '실내에서 놀기 좋은 날이네요!'
              : '실외 활동하기 좋은 날이에요!'}
          </div>
        </div>

        <div className="my-8 w-[60px] border text-white" />

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                className={`h2 group ml-[-15px] flex w-full items-center py-1 text-left font-semibold transition ${
                  active === item.label ? 'text-main font-bold' : 'text-white'
                } hover:text-main`}
                onClick={() => {
                  setActive(item.label);
                  close();
                }}
                type="button"
              >
                <span
                  className={`mr-2 h-1 w-1 rounded-full transition-all ${
                    active === item.label ? 'bg-main' : 'bg-transparent'
                  }`}
                />
                {item.label !== '로그아웃' ? (
                  <Link href={`/${item.value}`}>{item.label}</Link>
                ) : (
                  <div
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                  >
                    로그아웃
                  </div>
                )}

                {item.label === '알림' && notiCount > 0 && (
                  <div className="mt-[3px] ml-2 rounded-[20px] border border-[#ee3c3c] bg-[#ff8888] px-2 text-[12px] text-[#000]">
                    + {notiCount}
                  </div>
                )}
              </button>

              {/* 하단 줄 추가 */}
              {bottomBorder.includes(item.label) && (
                <div className="my-6 w-[60px] border text-white" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
