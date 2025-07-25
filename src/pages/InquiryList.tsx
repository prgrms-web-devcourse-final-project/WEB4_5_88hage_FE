//import Greeting from '@/components/common/Greeting';
'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InquiryListPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [pageNum, setPageNum] = useState<number[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    const params = `status=${pending ? 'pending' : 'complete'}&page=${page}&size=8&sort=createdAt,DESC`;
    try {
      const response = await fetch(`${API}/api/contacts?${params}`, {
        method: 'GET',
        credentials: 'include',
      });
      const { data } = await response.json();
      console.log(data);
      setContacts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  const convertTime = (createdAt: string) => {
    const date = new Date(createdAt);
    date.setHours(date.getHours() + 9);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    fetchData();
  }, [page, pending]);

  useEffect(() => {
    setPage(0);
    setPageNum([]);
    for (let i = 1; i <= totalPages; i++) {
      setPageNum((prev) => [...prev, i]);
    }
  }, [totalPages]);

  useEffect(() => {
    console.log(pageNum);
  }, [pageNum]);

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
              <button
                onClick={() => setPage((prev) => prev - 5)}
                disabled={
                  pageNum.slice(
                    Math.floor(page / 5) * 5,
                    Math.floor(page / 5) * 5 + 5,
                  )[0] === 1
                }
                className="disabled:text-gray-disabled p-2 disabled:cursor-none"
              >
                <ChevronLeft />
              </button>
              {pageNum
                .slice(Math.floor(page / 5) * 5, Math.floor(page / 5) * 5 + 5)
                .map((p) => (
                  <button
                    key={p}
                    className={`h-[29px] w-[29px] rounded-full text-[15px] transition ${
                      page === p - 1 ? 'bg-[#1CEBB9] font-bold text-black' : ''
                    } `}
                    onClick={() => setPage(p - 1)}
                  >
                    {p}
                  </button>
                ))}
              <button
                onClick={() => {
                  const arr = pageNum.slice(
                    Math.floor((page + 5) / 5) * 5,
                    Math.floor((page + 5) / 5) * 5 + 5,
                  );
                  if (!arr.includes(page + 6)) {
                    setPage(pageNum[pageNum.length - 2]);
                  } else setPage((prev) => prev + 5);
                }}
                disabled={
                  pageNum.slice(
                    Math.floor(page / 5) * 5,
                    Math.floor(page / 5) * 5 + 5,
                  )[
                    pageNum.slice(
                      Math.floor(page / 5) * 5,
                      Math.floor(page / 5) * 5 + 5,
                    ).length - 1
                  ] === pageNum[pageNum.length - 1]
                }
                className="disabled:text-gray-disabled p-2 disabled:cursor-none"
              >
                <ChevronRight />
              </button>
            </div>
          </main>
        </div>
      </DashboardLayout>
    </>
  );
}
