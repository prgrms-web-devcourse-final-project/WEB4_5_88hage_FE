'use client';

import Image from 'next/image';

export default function PostCard({ group }) {
  if (!group) return null;

  return (
    <div className="hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white">
      {/* 카테고리 이모지 or 아이콘 자리 */}
      {/* <div className="absolute top-3 left-3 z-10 text-[30px]">🍔</div> */}
      {/* 나중에 <CategoryIcon category={group.category} /> 로 교체 */}

      {/* 썸네일 */}
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