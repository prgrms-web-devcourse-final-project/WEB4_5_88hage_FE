//import Greeting from '@/components/common/Greeting';
'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InquiryListPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  const API = process.env.NEXT_PUBLIC_API_URL;
  const params = `status=${pending ? 'pending' : 'complete'}&page=${page.toString()}&size=8&sort=createdAt,DESC`;

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${API}/api/contacts?${params}`, {
        method: 'GET',
        credentials: 'include',
      });
      const { data } = await response.json();
      console.log(data.content);
      setContacts(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const convertTime = (createdAt: string) => {
    let date = new Date(createdAt);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [pending]);

  return (
    <>
      <DashboardLayout mainCss="px-[105px]">
        <div className="min-h-screen w-full bg-[#121212]">
          <main className="flex w-full max-w-[1440px] flex-col bg-[#121212] lg:pt-[29px]">
            <div className="relative flex w-full flex-col">
              <div className="flex gap-[4px]">
                <button
                  disabled={pending}
                  onClick={() => setPending(true)}
                  className="disbled:border-[#1CEBB9] z-5 border-b-2 pr-2 pb-[14px] text-[18px] text-[#949494] disabled:z-7 disabled:font-semibold disabled:text-[#1CEBB9] lg:text-[24px]"
                >
                  문의 내역
                </button>
                <button
                  disabled={!pending}
                  onClick={() => setPending(false)}
                  className="disbled:border-[#1CEBB9] z-5 border-b-2 px-2 pb-[14px] text-[18px] text-[#949494] disabled:z-7 disabled:font-semibold disabled:text-[#1CEBB9] lg:text-[24px]"
                >
                  답변이 완료 된 문의
                </button>
              </div>
              <div className="absolute bottom-0 z-6 w-full border-b-2 border-[#949494]"></div>
            </div>
            <div className="w-full">
              {contacts.map((n, idx) => (
                <div
                  key={idx}
                  className="flex items-center border-b border-[#383838] pt-[24px] pb-[24px] text-[15px]"
                >
                  <span className="w-[120px] font-semibold text-[#ffffff]">
                    {n.category === 'GENERAL' ? '일반' : '신고'}
                  </span>
                  <Link
                    href={`/inquiry/${n.id}`}
                    className="ml-[24px] flex-1 text-[#D2D2D2]"
                  >
                    {n.title}
                  </Link>
                  <span className="ml-[24px] text-[#A5A5A5]">
                    {convertTime(n.createdAt)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-3 text-[#ffffff] lg:mt-[52px]">
              <button className="p-2">&lt;</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`h-[29px] w-[29px] rounded-full text-[15px] transition ${
                    p === 1 ? 'bg-[#1CEBB9] font-bold text-black' : ''
                  } `}
                >
                  {p}
                </button>
              ))}
              <button className="p-2">&gt;</button>
            </div>
          </main>
        </div>
      </DashboardLayout>
    </>
  );
}
