import DetailSection from '@/components/DetailSection';
import { LucideLink2 } from 'lucide-react';

export default function GroupDetail() {
  return (
    <div className="flex min-h-screen bg-[#121212] px-60 py-20 text-[#f6f6f6]">
      <DetailSection />
      <div className="sticky top-8 h-full w-full px-10">
        <div className="flex flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] p-6">
          <div className="flex flex-col gap-5">
            <div className="gradient-border self-start px-6 py-1.5">
              음식 🍔
            </div>
            <div className="gradient-text text-3xl font-bold">
              워터밤 [서울]
            </div>
            <div className="flex gap-5">
              <span>경기도</span>
              <span>2025년 7월 19일 - 2025년 7월 21일</span>
            </div>
            <div className="flex gap-2">
              <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                멜론 티켓 <LucideLink2 />
              </div>
              <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                멜론 티켓 <LucideLink2 />
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
            <span className="gradient-text">알람 예약</span>
          </button>
        </div>
      </div>
    </div>
  );
}
