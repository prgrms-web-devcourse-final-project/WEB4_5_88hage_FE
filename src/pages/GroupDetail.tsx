import DetailSection from '@/components/DetailSection';

export default function GroupDetail() {
  return (
    <div className="flex min-h-screen bg-[#121212] px-60 py-20 text-[#f6f6f6]">
      <DetailSection />
      <div className="sticky top-8 h-full w-full px-10">
        <div className="flex flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] p-6">
          <div className="flex flex-col gap-5">
            <div className="gradient-border self-start px-6 py-2.5">
              음식 🍔
            </div>
            <div className="gradient-text text-3xl font-bold">
              힙스터들의 재즈바 모임
            </div>
            <div className="flex gap-2">
              <div className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                #태그
              </div>
              <div className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                #태그
              </div>
            </div>
          </div>
          {/* <hr className="text-[#2d2d2d]" /> */}
          <div></div>
          <div>
            정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지
            국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야
            한다. 모든 국민은 거주·이전의 자유를 가진다. 이전의 자유를 가진다.
            이전의 자유를 가진다...
          </div>
          <button className="mt-[17px] cursor-pointer rounded-sm bg-[#2a2a2a] p-4 text-3xl">
            <span className="gradient-text">모임 신청</span>
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-0 h-180 w-180 rounded-full bg-amber-600"></div>
    </div>
  );
}
