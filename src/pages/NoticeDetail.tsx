'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { HashLoader } from 'react-spinners';

type Notice = {
  title: string;
  content: string;
  createdAt?: string;
};

export default function NotiDetail() {
  const params = useParams();
  console.log('params:', params);

  const id =
    params && params.noticeId
      ? Array.isArray(params.noticeId)
        ? (params.noticeId[0] ?? '')
        : params.noticeId
      : '';

  const [notice, setNotice] = useState<Notice | null>(null);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    console.log('useEffect 동작, id:', id);
    if (!id) return;
    fetch(`${API}/api/admin/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('fetch 결과:', data);
        setNotice(data.data);
      });
  }, [id, API]);

  if (!notice)
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-col items-center bg-[#1d1d1d] pt-20 pb-10">
        <span className="mb-1 text-lg font-semibold tracking-tight text-white">
          고객지원
        </span>
        <h1 className="mt-5 text-center text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
            공지사항
          </span>
        </h1>
      </div>
      <main className="mb-20 flex justify-center bg-[#121212]">
        <div className="mx-auto mt-[46px] w-full max-w-[1220px] px-6">
          <p className="text-base font-semibold text-white lg:text-lg">
            {notice.title}
          </p>
          <p className="mt-[20px] mb-[20px] text-xs text-white lg:text-sm">
            {notice.createdAt?.slice(0, 10)}
          </p>
          <div className="border-y-1 border-[#4d4d4d]"></div>
          <p className="mt-[50px] text-xs text-[#ababab] lg:text-sm">
            {notice.content}
          </p>
        </div>
      </main>
    </div>
  );
}
