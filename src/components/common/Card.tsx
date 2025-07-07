'use client';

import Image from 'next/image';

export default function PostCard() {
  return (
    <div className="relative w-[345px] overflow-hidden rounded bg-black text-white">
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
      <div className="h-[120px] p-3">
        <h2 className="t3 mb-1">모임 이름</h2>
        <p className="text-gray-4 mb-5 text-[14px]">모임 소개글</p>
        <p className="text-gray-5 text-[14px]">모임 기간 (07.08 ~ 07.27)</p>
      </div>
    </div>
  );
}
