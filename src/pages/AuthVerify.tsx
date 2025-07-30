'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignupStore } from '@/stores/signupStore';
import { useEffect } from 'react';

export default function AuthVerify() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  const { setVerified } = useSignupStore();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/users/verify/signup?code=${code}`, {
      method: 'POST',
      body: JSON.stringify({ code: code }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === '0000') {
          setVerified(true);
          router.push('/signup/tags');
        } else setVerified(false);
      });
  }, [code, router, setVerified,API]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-xl font-bold text-white">로딩 중...</div>
    </div>
  );
}
