// 'use client';

import { useState } from 'react';
import Input from '@/components/common/Input';

export default function PasswordChangePage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeClick = () => {
    console.log('버튼 클릭됨');
    if (password !== confirmPassword) {
      setError('비밀번호를 확인 해주세요');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#232323] px-4 text-white md:px-0">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <h1 className="text-main text-3xl font-bold">
            <span className="text-white">FU</span>N
            <span className="text-white">FU</span>N
          </h1>

          <div className="flex w-full flex-col gap-4">
            <Input
              type="password"
              placeholder="변경 할 비밀번호를 입력 해주세요."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="변경 할 비밀번호를 확인 해주세요."
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />

            <div className="mt-6 hidden w-full md:block">
              <button
                className={`w-full rounded-md py-3 font-bold ${
                  confirmPassword
                    ? 'bg-[#1CEBB9] text-[#232323]'
                    : 'bg-[#313131] text-[#bdbdbd]'
                }`}
                onClick={handleChangeClick}
              >
                변경 하기
              </button>

              {error && (
                <p className="mt-6 text-center text-xs font-medium text-red-500">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-8 left-0 block px-4 md:hidden">
        {error && (
          <p className="mb-3 text-center text-xs font-medium text-red-500">
            {error}
          </p>
        )}
        <button
          className="w-full rounded-md bg-[#313131] py-3 font-bold text-[#bdbdbd]"
          onClick={handleChangeClick}
        >
          변경 하기
        </button>
      </div>
    </div>
  );
}
