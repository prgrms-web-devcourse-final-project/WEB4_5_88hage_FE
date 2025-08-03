'use client';

import { useAuthStore } from '@/stores/UseAuthStore'; // UseAuthStore 임포트

export default function Greeting() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <h1 className="mb-[20px] text-left text-[16px] font-extrabold text-white lg:mb-10 lg:text-[24px] xl:pl-[calc(max(0px,(100vw-1600px)*0.12))] xl:text-[32px]">
        안녕하세요,{' '}
        {isAuthenticated && user ? (
          <span className="text-main">{user.nickname}</span>
        ) : (
          '방문자'
        )}
        님 👋🏼
      </h1>
    </>
  );
}
