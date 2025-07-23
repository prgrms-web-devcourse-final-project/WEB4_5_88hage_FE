'use client';
import EmailCheck from '@/pages/EmailCheck';
import PasswordChangePage from '@/pages/PasswordChangePage';
import { useEffect, useState } from 'react';

export default function page() {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');

  return (
    <>
      {page === 1 && (
        <EmailCheck
          next={(str) => {
            setEmail(str);
            setPage(2);
          }}
        />
      )}
      {page === 2 && <PasswordChangePage email={email} />}
      {/* <EmailCheck next={() => console.log('test')} /> */}
    </>
  );
}
