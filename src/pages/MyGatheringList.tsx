//import Greeting from '@/components/common/Greeting';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MyGatheringList() {
  const notices = Array.from({ length: 7 }).map(() => ({
    category: '특정 사용자 신고',
    content: '안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대응이 잘될까요?',
    date: '2025년06월28일',
  }));

  return (
    <DashboardLayout mainCss="px-[105px]">
    <section className="bg-[#121212] text-white lg:pt-[29px]">
      <div className="mx-auto max-w-[1440px]">
        {/* 제목 */}
        <h2 className="lg:mb-[39px] text-left text-[20px] font-semibold text-white lg:text-[28px]">
          내 게시물
        </h2>

        {/* 상단 가로선 */}
        <div className="mb-1 border-t-2 border-[#383838] lg:mb-4" />

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="hidden lg:table-header-group">
              <tr className="border-b-2 border-[#383838]">
                <th className="px-15 pt-1 text-left align-top leading-none font-semibold text-[#06ce9e] lg:pb-5">
                  제목
                </th>
                <th className="px-8 pt-1 text-center align-top leading-none font-medium text-white lg:pb-5">
                  내용
                </th>
                <th className="px-15 pt-1 text-right align-top leading-none font-medium text-white lg:pb-5">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n, idx) => (
                <tr
                  key={idx}
                  className="mb-1 flex flex-col border-b border-[#383838] lg:table-row"
                >
                  <td className="px-8 py-2 font-semibold whitespace-nowrap text-[#06CE9E] lg:py-6 lg:align-top">
                    {n.category}
                  </td>
                  <td className="overflow-hidden px-8 py-1 text-sm text-ellipsis text-white lg:py-6 lg:align-top lg:text-[16px]">
                    {n.content}
                  </td>
                  <td className="overflow-visible px-8 py-3 text-xs whitespace-nowrap text-[#ffffff] lg:overflow-hidden lg:py-6 lg:text-right lg:align-top lg:text-[16px] lg:text-ellipsis lg:whitespace-nowrap">
                    {n.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 */}
        <div className="mt-[44px] flex justify-center space-x-3 text-[#C1C1E0]">
          <button className="p-2 transition hover:text-white">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`rounded-full px-3 py-1 transition ${
                p === 1
                  ? 'bg-[#06CE9E] text-black'
                  : 'hover:bg-[#3E3E5E] hover:text-white'
              } `}
            >
              {p}
            </button>
          ))}
          <button className="p-2 transition hover:text-white">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
    </DashboardLayout>
  );
}
