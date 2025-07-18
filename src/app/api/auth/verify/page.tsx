'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignupStore } from '@/stores/signupStore';
import { useEffect } from 'react';

export default function page() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  const { isVerified, setVerified } = useSignupStore();
  const router = useRouter();

  useEffect(() => {
    axios
      .post(
        `https://funfun.cloud/api/users/verify/signup?code=${code}`,
        { code: code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        setVerified(true);
        router.push('/signup/tags');
      })
      .catch((error) => {
        console.log(error.response.data);
        setVerified(false);
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-xl font-bold text-white">로딩 중...</div>
    </div>
  );
}
