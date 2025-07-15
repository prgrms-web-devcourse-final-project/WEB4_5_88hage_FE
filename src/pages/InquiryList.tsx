//import Greeting from '@/components/common/Greeting';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function InquiryListPage() {
  const notices = Array.from({ length: 8 }).map(() => ({
    category: '특정 사용자 신고',
    content:
      '안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?',
    date: '2025년06월28일',
  }));

  return (
    <>
    <DashboardLayout mainCss="px-[105px]">
    <div className="min-h-screen w-full bg-[#121212]">
      <main className="flex w-full max-w-[1440px] flex-col bg-[#121212] lg:pt-[29px]">

        <div className="relative flex w-full items-center">
          <button className="z-10 border-b-2 border-[#1CEBB9] pb-[14px] text-[18px] font-semibold text-[#1CEBB9] lg:text-[24px]">
            문의 내역
          </button>
          <button className="z-10 ml-[20px] border-b-2 border-[#9C9C9C] pb-[14px] text-[18px] text-[#949494] lg:text-[24px]">
            답변이 완료 된 문의
          </button>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 flex h-[2px]">
            <div className="h-full w-[110px] bg-[#1CEBB9]"></div>
            <div className="h-full flex-1 bg-[#9C9C9C]"></div>
          </div>
        </div>
        <div className="w-full">
          {notices.map((n, idx) => (
            <div
              key={idx}
              className="flex items-center border-b border-[#383838] pt-[24px] pb-[24px] text-[15px]"
            >
              <span className="w-[120px] font-semibold text-[#ffffff]">
                {n.category}
              </span>
              <span className="ml-[24px] flex-1 text-[#D2D2D2]">
                {n.content}
              </span>
              <span className="ml-[24px] text-[#A5A5A5]">{n.date}</span>
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
