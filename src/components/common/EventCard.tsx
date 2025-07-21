'use client';

import Image from 'next/image';

export default function EventCard() {

  return (
    <div className="hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white">

      <div className="relative h-[240px] w-full">
        <Image
          src={group.imageUrl || '/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-lg object-cover"
          priority
        />
      </div>
      {/* 콘텐츠 */}
      <div className="h-[120px] bg-[#1b1b1b] p-3">
        <h2 className="t3 mb-1">{group.title}</h2>
        <p className="mb-5 text-[14px] text-[#ffffff]">{group.simpleExplain}</p>
        <p className="text-[14px] text-[#bdbdbd]">모임 기간 ({group.during})</p>
      </div>
    </div>
  );
}