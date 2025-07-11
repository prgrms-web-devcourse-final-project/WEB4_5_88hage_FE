'use client';
import Emailsend from '@/pages/emailsend';
import Signup from '@/pages/Signup';
import SignupPreferences from '@/pages/SignupPreferences';
import { useEffect, useState } from 'react';

type NewUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
};

export default function page() {
  const [page, setPage] = useState(1);
  const [newUserData, setNewUserData] = useState<NewUserData>();

  const getUserData = (data: NewUserData) => {
    console.log(data);
    setPage(2);
    setNewUserData(newUserData);
  };

  return (
    <>
      {page === 1 && <Signup sendUserData={getUserData} />}
      {page === 2 && <Emailsend />}
      {page === 3 && <SignupPreferences />}
    </>
  );
}
