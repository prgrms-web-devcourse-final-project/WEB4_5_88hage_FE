'use client';

import { useForm } from 'react-hook-form';
import GrayButton from '@/components/button/GrayButton';
import Input from '@/components/common/Input';
import logo from '@/assets/images/logo.svg';
import loginBgImg from '@/assets/images/loginBgImg.png';
import LoginButton from '@/components/button/LoginButton';
import Checkbox from '@/components/Checkbox';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/UseAuthStore';
import { LoginRequest } from '@/types/auth';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  //const setAuth = useAuthStore((s) => s.setAuth);
  //const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data.email, data.password, data.rememberMe);
      router.push('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      setLoginError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="relative flex h-screen w-screen">
      {/* 왼쪽(데스크탑 뷰): 배경  */}
      <div className="hidden w-1/2 bg-black lg:flex lg:items-center lg:justify-center">
        <Image
          alt="로고"
          src={logo}
          className="top-[30px] left-[40px] mb-5 hidden lg:absolute lg:block"
          priority
        />
        <Image
          alt="로그인 이미지"
          src={loginBgImg}
          className="hidden lg:block"
          width={500}
          height={500}
          priority
        />
      </div>

      {/* 오른쪽: 로그인 폼 */}
      <div className="bg-gray-7 flex w-full flex-col items-center justify-center px-[20px] lg:w-1/2 lg:px-[150px]">
        <div className="w-full min-w-[335px] space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-7"
          >
            <Input
              placeholder="이메일을 입력 해주세요"
              {...register('email', { required: '이메일을 입력해주세요' })}
              className="h-[60px] w-full rounded-[5px] lg:h-[80px] lg:rounded-[10px]"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            <Input
              type="password"
              placeholder="비밀번호를 입력 해주세요"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
              })}
              className="h-[60px] w-full rounded-[5px] lg:h-[80px] lg:rounded-[10px]"
            />
            {errors.password && (
              <p className="t4 mt-[-10px] mb-3 text-red-500">
                {errors.password.message}
              </p>
            )}

            <GrayButton
              type="submit"
              className="bg-gray-5 h-[60px] w-full rounded-[5px] text-white lg:h-[80px] lg:rounded-[10px]"
            >
              로그인
            </GrayButton>

            {loginError && (
              <p className="t4 py-2 text-center text-red-500">{loginError}</p>
            )}

            <div className="flex items-center justify-between font-semibold text-[#8d8d8d]">
              <label className="flex items-center gap-2">
                <Checkbox
                  label="로그인 상태 유지"
                  {...register('rememberMe')}
                />
              </label>
              <button
                type="button"
                onClick={() => router.push('/password-change')}
              >
                비밀번호 찾기
              </button>
            </div>
          </form>

          <hr className="my-[16px] border-t border-[#434343] lg:my-[25px]" />
          <div className="space-y-4 lg:space-y-6">
            <LoginButton type="naver" />
            <LoginButton type="google" />
          </div>
          <div className="t4 text-gray-6 mt-[14px] text-center font-semibold lg:mt-[25px]">
            <span className="text-[#8D8D8D]">아직 회원이 아니신가요? </span>
            <button
              type="button"
              className="text-main"
              onClick={() => router.push('/signup')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
