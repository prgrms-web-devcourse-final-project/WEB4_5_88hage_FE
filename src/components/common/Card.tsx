'use client';

import Image from 'next/image';

type PostCardProps = {
  thumbnail: string;
  title: string;
  description: string;
  period: string;
};

export default function PostCard({
  thumbnail,
  title,
  description,
  period,
}: PostCardProps) {
  return (
    <div className="relative w-[300px] overflow-hidden rounded-lg bg-[#2f2f2f] text-white shadow-md">
      {/* 햄버거 이모지 */}
      <div className="absolute top-3 left-3 z-10 text-2xl">🍔</div>

      {/* 썸네일 */}
      <div className="relative h-[180px] w-full">
        <Image
          src={thumbnail}
          alt="썸네일"
          fill
          className="rounded-t-lg object-cover"
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className="space-y-2 p-4">
        <h2 className="t3 font-bold">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
        <p className="text-xs text-gray-400">{period}</p>
      </div>
    </div>
  );
}
