'use client';

import Image from 'next/image';

export default function PostCard() {
  return (
    <div className="hover-gradient relative w-[345px] cursor-pointer overflow-hidden rounded-[5px] bg-black text-white">
      {/* 햄버거 이모지 */}
      <div className="absolute top-3 left-3 z-10 text-[30px]">🍔</div>

      {/* 썸네일 */}
      <div className="relative h-[240px] w-full">
        <Image
          src={'/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-lg object-cover"
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className="h-[120px] bg-[#1b1b1b] p-3">
        <h2 className="t3 mb-1">모임 이름</h2>
        <p className="mb-5 text-[14px] text-[#ffffff]">모임 소개글</p>
        <p className="text-[14px] text-[#bdbdbd]">모임 기간 (07.08 ~ 07.27)</p>
      </div>
    </div>
  );
}
