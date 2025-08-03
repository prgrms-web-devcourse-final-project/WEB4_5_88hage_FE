//import Greeting from '@/components/common/Greeting';
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLeaderMyGroups } from '@/lib/api/group';

export default function MyGatheringList() {
  const [myGatherings, setMyGatherings] = useState<LeaderMyGroupData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Display 10 items per page
  const router = useRouter();

  useEffect(() => {
    const fetchMyGatherings = async () => {
      try {
        const data = await getLeaderMyGroups();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.groupDate).getTime() - new Date(a.groupDate).getTime(),
        );
        setMyGatherings(sortedData);
      } catch (error) {
        console.error('Failed to fetch my gatherings:', error);
      }
    };
    fetchMyGatherings();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(myGatherings.length / itemsPerPage);

  // Get current items for display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myGatherings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle next and previous page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="text-white lg:pt-[29px]">
      <div className="mx-auto max-w-[1440px]">
        {/* 제목 */}
        <h2 className="text-left text-[20px] font-semibold text-white lg:mb-[39px] lg:text-[28px]">
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
              {currentItems.map((item) => (
                <tr
                  key={item.groupId}
                  className="mb-1 flex cursor-pointer flex-col border-b border-[#383838] lg:table-row"
                  onClick={() => router.push(`/gathering/${item.groupId}`)}
                >
                  <td className="px-8 py-2 font-semibold whitespace-nowrap text-[#06CE9E] lg:py-6 lg:align-top">
                    {item.groupTitle}
                  </td>
                  <td className="overflow-hidden px-8 py-1 text-sm text-ellipsis text-white lg:py-6 lg:align-top lg:text-[16px]">
                    {item.explain}
                  </td>
                  <td className="overflow-visible px-8 py-3 text-xs whitespace-nowrap text-[#ffffff] lg:overflow-hidden lg:py-6 lg:text-right lg:align-top lg:text-[16px] lg:text-ellipsis lg:whitespace-nowrap">
                    {item.groupDate.replace(/-/g, '').substring(0, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징 */}
        {myGatherings.length > 0 && (
          <div className="mt-[44px] flex justify-center space-x-3 text-[#C1C1E0]">
            <button
              className="p-2 transition hover:text-white"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => paginate(p)}
                className={`rounded-full px-3 py-1 transition ${
                  p === currentPage
                    ? 'bg-main text-black'
                    : 'hover:bg-[#3E3E5E] hover:text-white'
                } `}
              >
                {p}
              </button>
            ))}
            <button
              className="p-2 transition hover:text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {myGatherings.length < 1 && (
          <div className="py-10 text-center text-[#888]">
            게시글이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
