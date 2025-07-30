'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 문의 타입 명확하게 지정!
type Contact = {
  id: number;
  category: 'GENERAL' | 'REPORT';
  title: string;
  createdAt: string;
};

export default function InquiryListPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNum, setPageNum] = useState<number[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  // 데이터 패칭
  const fetchData = async () => {
    const params = `status=${pending ? 'pending' : 'complete'}&page=${page}&size=8&sort=createdAt,DESC`;
    try {
      const response = await fetch(`${API}/api/contacts?${params}`, {
        method: 'GET',
        credentials: 'include',
      });
      const { data } = await response.json();
      setContacts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      setContacts([]);
    }
  };

  // 날짜 포맷
  const convertTime = (createdAt: string) => {
    const date = new Date(createdAt);
    // date.setHours(date.getHours() + 9);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, pending]);

  useEffect(() => {
    setPage(0);
    const nums: number[] = [];
    for (let i = 1; i <= totalPages; i++) nums.push(i);
    setPageNum(nums);
  }, [totalPages]);

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1440px]">
        <main className="flex w-full flex-col lg:pt-[29px]">
          {/* 상단 탭 & border */}
          <div className="mb-[4px] flex w-full gap-[4px] border-b-2 border-[#949494]">
            <button
              disabled={pending}
              onClick={() => setPending(true)}
              className="z-5 border-b-2 border-transparent pr-2 pb-[14px] text-[18px] text-[#949494] transition disabled:border-[#1CEBB9] disabled:font-semibold disabled:text-[#1CEBB9] lg:text-[24px]"
            >
              문의 내역
            </button>
            <button
              disabled={!pending}
              onClick={() => setPending(false)}
              className="z-5 border-b-2 border-transparent px-2 pb-[14px] text-[18px] text-[#949494] transition disabled:border-[#1CEBB9] disabled:font-semibold disabled:text-[#1CEBB9] lg:text-[24px]"
            >
              답변이 완료 된 문의
            </button>
          </div>
          {/* 문의 내역 리스트 */}
          <div className="w-full">
            {contacts.length === 0 ? (
              <div className="py-10 text-center text-[#888]">
                {pending
                  ? '문의 내역이 없습니다.'
                  : '답변이 완료 된 문의가 없습니다.'}
              </div>
            ) : (
              contacts.map((n) => (
                <div
                  key={n.id}
                  className="flex w-full items-center border-b border-[#383838] pt-[24px] pb-[24px] text-[15px]"
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
              ))
            )}
          </div>
          {/* 페이지네이션 */}
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
    </div>
  );
}
