'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
//import Greeting from '@/components/common/Greeting';
import { toast } from "react-toastify";

export default function InquiryDetail({ id }: { id: string }) {
  type InquiryData = {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
    createdAt: string;
    answer: any;
    answeredAt: any;
    imageUrls: any[];
  };
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [inquiryData, setInquiryData] = useState<InquiryData>();
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/contacts/${id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (data.code === '0000') setInquiryData(data.data);
      else {
        toast.info(data.reason);
        router.push('/user/inquiry');
      }
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
  }, [id]);

  return (
    <>
      <DashboardLayout mainCss="px-[105px]">
        {inquiryData && (
          <div className="flex min-h-screen max-w-[1440px] flex-col">
            <div className="flex min-h-screen w-full flex-col lg:pt-[14px]">
              <div></div>
              <div className="flex flex-col items-start justify-center pb-4 lg:items-center lg:pb-10">
                <h1 className="mb-3 w-full text-left text-[20px] font-semibold lg:mb-2 lg:text-center lg:text-[32px]">
                  <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
                    문의 내역
                  </span>
                </h1>
              </div>

              {/* 문의 요약 */}
              <div className="mb-4 flex flex-col gap-1 border-t-2 border-b border-[#444] py-3 lg:mb-3 lg:flex-row lg:items-center lg:gap-6 lg:py-6">
                <span className="text-[12px] font-semibold text-[#ffffff] lg:min-w-[140px] lg:text-[16px]">
                  {inquiryData && inquiryData.category === 'GENERAL'
                    ? '일반'
                    : '특정 사용자 신고'}
                </span>
                <span className="flex-1 text-left text-[12px] text-[#d2d2d2] lg:text-[16px] lg:text-[#ffffff]">
                  {inquiryData.title}
                </span>
                <span className="mt-1 min-w-fit self-start text-[11px] text-[#A5A5A5] lg:mt-0 lg:self-auto lg:text-xs">
                  {convertTime(inquiryData.createdAt)}
                </span>
              </div>

              {/* Q */}
              <div className="mt-3 mb-4">
                <div className="flex flex-col gap-1">
                  <div className="mb-2 flex items-center gap-1">
                    <span className="text-[15px] text-[#00e6ae] lg:text-[18px]">
                      Q. {inquiryData.title}
                    </span>
                  </div>
                  <p className="ml-0 text-[13px] leading-relaxed text-[#f6f6f6] lg:ml-[25px] lg:text-[16px]">
                    {inquiryData.content}
                  </p>
                </div>
              </div>

              {/* A */}
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-1">
                  <span className="text-[15px] text-[#00e6ae] lg:text-[18px]">
                    A. 답변
                  </span>
                </div>
                <p className="ml-0 text-[13px] leading-relaxed text-[#f6f6f6] lg:ml-[25px] lg:text-[16px]">
                  {inquiryData.answer ? inquiryData.answer : '답변이 없습니다.'}
                </p>
              </div>

              {/* 버튼 */}
              <div className="flex justify-center border-t-2 border-[#444] pt-[62px] pb-[170px]">
                <Link
                  href="/user/inquiry"
                  className="h-[48px] w-[196px] rounded-md bg-[#303236] py-3 text-center text-[15px] text-[#D4D4D4] transition hover:bg-[#35383b] lg:w-auto lg:px-6 lg:py-2 lg:text-[18px]"
                >
                  목록으로 이동
                </Link>
              </div>
            </div>
          </div>
        )}
        {!inquiryData && (
          <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center text-xl font-semibold text-white">
            로딩 중...
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
