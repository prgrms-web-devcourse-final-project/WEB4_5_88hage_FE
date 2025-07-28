// 'use client';

import { useState } from 'react';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import { changePassword } from '@/lib/api/user';
import { toast } from "react-toastify";

export default function PasswordChangePage({ email }: { email: string }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState('');
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleChangeClick = async () => {
    const newData: ChangePasswordRequest = {
      password: password,
      confirmPassword: confirmPassword,
    };
    const response = await fetch(`${API}/api/users/change/password/${email}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    console.log(data);
    if (data.code === '4027') toast.info(data.message);
    if (data.code !== '0000') {
      if (data.data.password) toast.info(data.data.password);
      else if (data.data.confirmPassword) toast.info(data.data.confirmPassword);
      else toast.info(data.message);
    } else {
      toast.info(data.data);
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-4 text-white md:px-0">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-150 flex-col items-center gap-6">
          {/* <h1 className="text-main text-3xl font-bold">
            <span className="text-white">FU</span>N
            <span className="text-white">FU</span>N
          </h1> */}
          <Image src={logo} alt="logo" />

          <div className="flex w-full flex-col gap-4">
            <Input
              type="password"
              placeholder="변경할 비밀번호를 입력 해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-5 focus:outline-link py- h-12.5 w-full max-w-150 rounded-[5px] px-4 placeholder:font-semibold"
            />
            <Input
              type="password"
              placeholder="변경할 비밀번호를 확인 해주세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-5 focus:outline-link h-12.5 w-full max-w-150 rounded-[5px] px-4 placeholder:font-semibold"
            />

            <div className="mt-6 hidden w-full lg:block">
              <button className="signup-btn" onClick={handleChangeClick}>
                변경 하기
              </button>

              {/* {error && (
                <p className="mt-6 text-center text-xs font-medium text-red-500">
                  {error}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-4 w-full max-w-150 lg:hidden">
        {/* {error && (
          <p className="mb-3 text-center text-xs font-medium text-red-500">
            {error}
          </p>
        )} */}
        <button
          className="signup-btn w-full rounded-md"
          onClick={handleChangeClick}
        >
          변경 하기
        </button>
      </div>
    </div>
  );
}
