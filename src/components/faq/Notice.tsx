"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

type NoticeRaw = {
  id: number;
  category?: string;
  title: string;
  createdAt: string;
};

type Notice = {
  id: number;
  category: string;
  content: string;
  date: string;
};

export default function NoticeContent() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const getNoticeList = async (pageNum = 0) => {
    try {
      const response = await fetch(
        `${API}/api/admin/notices?page=${pageNum}&size=${PAGE_SIZE}&sort=createdAt,desc`
      );
      const res = await response.json();
      setNotices(
  (res.data?.content || []).map((n: NoticeRaw) => ({
    id: n.id,
    category: n.category || "공지",
    content: n.title,
    date: n.createdAt?.split("T")[0].replace(/-/g, "."),
  }))
);
      setTotalPages(res.data?.totalPages || 1);
    } catch (error) {
      console.log("공지사항 정보를 불러오는데 실패했습니다 :", error);
    }
  };

  useEffect(() => {
    getNoticeList(page);
    // eslint-disable-next-line
  }, [page]);

  // 페이지 번호 배열 생성
  const pageButtons = [];
  for (let i = 0; i < totalPages; i++) {
    pageButtons.push(i + 1);
  }

  return (
    <section className="bg-[#121212] text-white px-6 lg:px-24 pt-10 lg:pt-12 pb-32 w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* 제목 */}
        <h2 className="text-xl lg:text-2xl text-white text-center mb-8">
          공지사항
        </h2>
        {/* 상단 가로선 */}
        <div className="border-t-2 border-[#383838] lg:mb-4 mb-1" />
        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] table-auto border-collapse">
            <thead className="hidden lg:table-header-group">
              <tr className="border-b-2 border-[#383838]">
                <th className="px-4 pt-1 lg:pb-5 align-top leading-none text-center text-[#06ce9e] font-semibold w-[100px]">
                  카테고리
                </th>
                <th className="px-8 pt-1 lg:pb-5 align-top leading-none text-center text-white font-medium">
                  제목
                </th>
                <th className="px-15 pt-1 lg:pb-5 align-top leading-none text-right text-white font-medium whitespace-nowrap w-[112px]">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n) => (
                <tr
                  key={n.id}
                  className="flex flex-col lg:table-row border-b border-[#383838] mb-1 cursor-pointer hover:bg-[#191919] transition"
                  onClick={() => router.push(`/notice/${n.id}`)}
                >
                  <td className="text-center lg:table-cell lg:py-6 lg:align-top text-[#06CE9E] font-semibold whitespace-nowrap px-4 w-[100px]">
                    {n.category}
                  </td>
                  <td className="text-sm lg:text-base px-8 lg:py-6 py-1 lg:align-top text-white break-words">
                    {n.content}
                  </td>
                  <td className="text-xs lg:text-base px-8 lg:py-6 py-3 lg:align-top text-[#ffffff] lg:text-right whitespace-nowrap overflow-visible lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                    {n.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 */}
        <div className="flex justify-center space-x-3 lg:mt-[24px] text-[#C1C1E0]">
          <button
            className="p-2 hover:text-white transition"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          {pageButtons
            .slice(Math.max(0, page - 2), Math.min(totalPages, page + 3))
            .map((p) => (
              <button
                key={p}
                className={`
                  px-3 py-1 rounded-full transition
                  ${p === page + 1
                    ? "bg-[#06CE9E] text-black"
                    : "hover:bg-[#3E3E5E] hover:text-white"}
                `}
                onClick={() => setPage(p - 1)}
              >
                {p}
              </button>
            ))}
          <button
            className="p-2 hover:text-white transition"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}