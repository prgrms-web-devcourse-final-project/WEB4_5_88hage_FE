'use client';
import Image from 'next/image';
import EmailImage from '@/assets/images/email.svg';
import { FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useSignupStore } from '@/stores/signupStore';
import { useRouter } from 'next/navigation';

export default function Emailsend() {
  const { userData, isVerified } = useSignupStore();
  const router = useRouter();

  // if (isVerified) router.push('/signup/tags');

  const emailSendAgain = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      axios
        .post(
          `https://funfun.cloud/api/users/send/signup/${userData.email}`,
          userData.email,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          alert('인증 메일이 재발송되었습니다.');
        })
        .catch((error) => {
          console.log(error.response.data);
          alert(error.response.data.message);
        });
    }
  };

  const goNextPage = () => {
    router.push('/signup/tags');
  };

  return (
    <div className="bg-bg-color flex min-h-screen flex-col items-center justify-start px-6 pt-[140px] text-center text-white md:justify-center md:pt-0">
      <form
        onSubmit={!isVerified ? emailSendAgain : goNextPage}
        className="flex w-full max-w-[620px] flex-col items-center"
      >
        <div className="mb-6">
          <Image src={EmailImage} alt="email icon" width={200} height={200} />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#1CEBB9] md:mb-4 md:text-3xl">
          이메일 인증이 필요합니다.
        </h1>

        <p className="mb-8 text-xs leading-relaxed text-[#bdbdbd] md:mb-10 md:text-sm md:leading-loose">
          가입하신 이메일로 인증 메일을 보냈습니다.&nbsp;
          <br className="block md:hidden" />
          메일함을 확인하고 인증을 완료해 주세요.
        </p>

        {/* <button
          className="absolute top-10 left-10 text-xl font-bold text-white"
          type="button"
          onClick={goNextPage}
        >
          다음
        </button> */}

        <button className="signup-btn absolute bottom-5 max-w-130 md:relative md:max-w-150">
          인증 메일 재발송
        </button>
      </form>
    </div>
  );
}
