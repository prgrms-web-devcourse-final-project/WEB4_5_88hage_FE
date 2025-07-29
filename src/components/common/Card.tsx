'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// function formatDuration(minutes) {
//   if (!minutes && minutes !== 0) return '-';
//   const h = Math.floor(minutes / 60);
//   const m = minutes % 60;
//   if (h === 0) return `${m}분`;
//   if (m === 0) return `${h}시간`;
//   return `${h}시간 ${m}분`;
// }

export default function PostCard({ group }) {
  const router = useRouter();

  if (!group) return null;

  const handleClick = () => {
    router.push(`/gathering/${group.id}`);
  };

  return (
    <div
      className="hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
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
        <p className="mb-5 text-[14px] text-[#ffffff]">주최자: {group.leaderNickname}</p>
        <p className="text-[14px] text-[#bdbdbd]">
          시작일: {group.groupDate
    ? (() => {
        const d = group.groupDate.split("T")[0].split("-");
        return `${d[1]}.${d[2]}`;
      })()
    : "미정"}
        </p>
      </div>
    </div>
  );
}