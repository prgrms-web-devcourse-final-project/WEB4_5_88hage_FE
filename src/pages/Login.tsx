'use client';

import { useForm } from 'react-hook-form';
import GrayButton from '@/components/button/GrayButton';
import Input from '@/components/common/Input';
import Logo from '@/components/Logo';
import LoginButton from '@/components/button/LoginButton';
import Checkbox from '@/components/Checkbox';

type LoginFormData = {
  email: string;
  password: string;
  keepLoggedIn: boolean;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인 데이터:', data);
    // 로그인 요청 API 연동 부분
  };

  return (
    <div className="flex h-screen w-screen">
      {/* 왼쪽(데스크탑 뷰): 배경  */}
      <div className="hidden w-1/2 bg-black lg:block" />
      {/* 오른쪽: 로그인 창 */}
      <div className="flex w-full flex-col items-center justify-center px-5 lg:w-1/2">
        <Logo className="mb-5" />
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="이메일을 입력 해주세요"
              {...register('email', {
                required: '이메일을 입력해주세요',
              })}
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
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}

            <GrayButton type="submit" className="text-white">
              로그인
            </GrayButton>

            <div className="t4 flex items-center justify-between font-semibold text-[#8d8d8d]">
              <label className="flex items-center gap-2">
                <Checkbox
                  label="로그인 상태 유지"
                  {...register('keepLoggedIn')}
                />
              </label>
              <button type="button">비밀번호 찾기</button>
            </div>
          </form>

          <hr className="border-t border-[#434343]" />

          <div className="space-y-3">
            <LoginButton type="naver" />
            <LoginButton type="google" />
          </div>

          <div className="t4 text-gray-6 mt-10 text-center font-semibold">
            <span>아직 회원이 아니신가요? </span>
            <button className="text-main">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
