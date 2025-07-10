'use client';
import Emailsend from '@/pages/Emailsend';
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
    setNewUserData(newUserData);
    setPage(2);
  };

  return (
    <>
      {page === 1 && <Signup sendUserData={getUserData} />}
      {page === 2 && <Emailsend />}
      {page === 3 && <SignupPreferences />}
    </>
  );
}
