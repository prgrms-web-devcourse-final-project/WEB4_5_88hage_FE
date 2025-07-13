export default function InquiryListPage() {
  const notices = Array.from({ length: 8 }).map(() => ({
    category: "특정 사용자 신고",
    content: "안녕하세요. 특정 악질 사용자 신고 문의 넣었는데 대처가 잘 됐을까요?",
    date: "2025년06월28일",
  }));

  return (
    <div className="min-h-screen bg-[#121212] w-full">
      <main className="w-full flex flex-col bg-[#121212] px-4 lg:px-[105px]">
        <h1 className="text-[16px] lg:text-[32px] font-bold text-white mb-[45px] lg:mb-[69px] mt-[32px] lg:mt-[24px] flex items-center">
          안녕하세요, 홍길동님 👋
        </h1>
        <div className="relative w-full flex items-center">
          <button className="text-[#1CEBB9] font-semibold lg:text-[24px] text-[18px] pb-[14px] border-b-2 border-[#1CEBB9] z-10">
            문의 내역
          </button>
          <button className="text-[#949494] lg:text-[24px] text-[18px] ml-[20px] pb-[14px] border-b-2 border-[#9C9C9C] z-10">
            답변이 완료 된 문의
          </button>
          <div className="absolute left-0 right-0 bottom-0 h-[2px] flex z-0 pointer-events-none">
            <div className="bg-[#1CEBB9] w-[110px] h-full"></div>
            <div className="bg-[#9C9C9C] flex-1 h-full"></div>
          </div>
        </div>
        <div className="w-full">
          {notices.map((n, idx) => (
            <div
              key={idx}
              className="pt-[24px] pb-[24px] flex items-center border-b border-[#383838] text-[15px]"
            >
              <span className="w-[120px] text-[#ffffff] font-semibold">{n.category}</span>
              <span className="flex-1 text-[#D2D2D2] ml-[24px]">{n.content}</span>
              <span className="text-[#A5A5A5] ml-[24px]">{n.date}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-3 lg:mt-[52px] text-[#ffffff]">
          <button className="p-2">&lt;</button>
          {[1,2,3,4,5].map((p) => (
            <button
              key={p}
              className={`w-[29px] h-[29px] rounded-full transition text-[15px]
                ${p === 1
                  ? "bg-[#1CEBB9] text-black font-bold"
                  : ""}
              `}
            >
              {p}
            </button>
          ))}
          <button className="p-2">&gt;</button>
        </div>
      </main>
    </div>
  );
}