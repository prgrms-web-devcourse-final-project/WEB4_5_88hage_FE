'use client';
import Image from 'next/image';
import email from '../assets/images/email.svg';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormValues = {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  c6: string;
};

export default function EmailCheck({
  next,
}: {
  next?: (email: string) => void;
}) {
  const [emailInput, setEmailInput] = useState('');
  const [isCodeInput, setIsCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const { register, handleSubmit } = useForm<FormValues>();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const sendMailToMe = async () => {
    const response = await fetch(`${API}/api/users/send/code/${emailInput}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const { code, message, data } = await response.json();
    if (code === '0000') {
      toast.info(data);
      setIsCodeInput(true);
    } else toast.error(message);
  };

  const sendMailAgain = async () => {
    const response = await fetch(`${API}/api/users/send/code/${emailInput}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const { code, message, data } = await response.json();
    if (code === '0000') {
      toast.info(data);
    } else toast.error(message);
  };

  const codeEvent = async (c: string) => {
    const response = await fetch(
      `${API}//api/users/verify/code/${emailInput}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: c }),
        credentials: 'include',
      },
    );
    const { code, message } = await response.json();
    if (code === '0000') {
      toast.info(message);
      if (next) next(emailInput);
    } else toast.info(message);
  };

  const codeSubmit: SubmitHandler<FormValues> = (d) => {
    const { c1, c2, c3, c4, c5, c6 } = d;
    setCodeInput(`${c1}${c2}${c3}${c4}${c5}${c6}`);
  };

  useEffect(() => {
    if (codeInput.length === 6) codeEvent(codeInput);
  },);

  return (
    <form
      onSubmit={handleSubmit(codeSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      className="flex h-screen w-screen flex-col items-center justify-center bg-[var(--color-black)] px-5 text-white"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-150 flex-col items-center">
          <Image src={email} alt="" sizes="200" />
          <span className="text-xl font-bold text-[#c0c0c0]">
            이메일을 입력하고 인증 해주세요.
          </span>
          <div className="h-5" />
          {!isCodeInput ? (
            <input
              type="text"
              placeholder="이메일을 입력 해주세요"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-gray-5 focus:outline-link placeholder:text-gray-disabled h-12.5 w-full max-w-150 rounded-[5px] px-4 placeholder:font-semibold focus:outline-2"
            />
          ) : (
            <div className="flex w-full max-w-150 justify-between gap-3">
              <input
                type="text"
                {...register('c1')}
                maxLength={1}
                id="codeInputBox1"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    document.getElementById('codeInputBox2')?.focus();
                  }
                }}
              />
              <input
                type="text"
                {...register('c2')}
                maxLength={1}
                id="codeInputBox2"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    document.getElementById('codeInputBox3')?.focus();
                  }
                }}
              />
              <input
                type="text"
                {...register('c3')}
                maxLength={1}
                id="codeInputBox3"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    document.getElementById('codeInputBox4')?.focus();
                  }
                }}
              />
              <input
                type="text"
                {...register('c4')}
                maxLength={1}
                id="codeInputBox4"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    document.getElementById('codeInputBox5')?.focus();
                  }
                }}
              />
              <input
                type="text"
                {...register('c5')}
                maxLength={1}
                id="codeInputBox5"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    document.getElementById('codeInputBox6')?.focus();
                  }
                }}
              />
              <input
                type="text"
                {...register('c6')}
                maxLength={1}
                id="codeInputBox6"
                className="bg-gray-5 aspect-square w-full max-w-20 rounded-[5px] text-center text-xl focus:outline-2 focus:outline-[#1cebb9b3] lg:text-2xl"
                // onChange={(e) => {
                //   if (e.target.value.length > 0) {
                //     document.getElementById('codeInputBox2')?.focus();
                //   }
                // }}
              />
            </div>
          )}
          {!isCodeInput ? (
            <button
              type="button"
              onClick={sendMailToMe}
              className="signup-btn mt-5 mb-[13px] hidden lg:block"
            >
              이메일 인증
            </button>
          ) : (
            <button
              type="submit"
              className="signup-btn mt-5 mb-[13px] hidden lg:block"
            >
              인증
            </button>
          )}
        </div>
        {isCodeInput && (
          <div className="mt-5 flex h-5 items-center gap-2 text-[14px] font-semibold">
            <span>이메일 전송이 안 됐나요?</span>
            <button
              type="button"
              onClick={sendMailAgain}
              className="cursor-pointer text-[#1CEBB9]"
            >
              이메일 재전송
            </button>
          </div>
        )}
      </div>
      {!isCodeInput ? (
        <button
          type="button"
          onClick={sendMailToMe}
          className="signup-btn mb-[13px] lg:hidden"
        >
          이메일 인증
        </button>
      ) : (
        <button type="submit" className="signup-btn mb-[13px] lg:hidden">
          인증
        </button>
      )}
    </form>
  );
}
