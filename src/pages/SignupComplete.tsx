'use client';
import Image from 'next/image';
import completeImg from '@/assets/images/signup_complete.png';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signupStore';
import { useCallback, useEffect } from 'react';

export default function SignupComplete() {
  const router = useRouter();
  const { userData, clearAll } = useSignupStore();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const loginInThisPage = useCallback(async () => {
  if (!userData?.email || !userData?.password) return;

  try {
    const response = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        rememberMe: true,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData.message || response.status);
      return;
    }

    const data = await response.json();
    console.log('Login success:', data);
  } catch (error) {
    console.error('Login error:', error);
  }
}, [userData, API]);

useEffect(() => {
  loginInThisPage();
}, [loginInThisPage]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clearAll();
        localStorage.removeItem('signup-store');
        router.push('/');
      }}
      className="flex h-screen w-screen flex-col items-center justify-between px-5 py-[14px] lg:justify-center"
    >
      <div className="lg:hidden"></div>
      <div className="flex w-150 max-w-full flex-col items-center text-[#fff]">
        <div>
          <Image src={completeImg} alt="completeImg" />
        </div>
        <div className="mt-6 mb-2.5 flex gap-4 text-[32px]">
          <span>환영해요!</span>
          <span>
            {userData && (
              <strong className="text-main">{userData.nickname}</strong>
            )}
            님
          </span>
        </div>
        <div>이제 다양한 서비스를 자유롭게 이용하실 수 있어요.</div>
        <button className="signup-btn mt-[90px] hidden lg:block">
          홈으로 가기
        </button>
      </div>
      <button className="signup-btn lg:hidden">홈으로 가기</button>
    </form>
  );
}
