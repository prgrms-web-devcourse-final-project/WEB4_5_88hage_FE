'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type GroupItem = {
  id: number;
  title: string;
  imageUrl: string;
  simpleExplain: string;
  placeName: string;
  leaderNickname?: string;
  groupDate?: string;
};

type PostCardProps = {
  group: GroupItem;
};

export default function PostCard({ group }: PostCardProps) {
  const router = useRouter();

  if (!group) return null;

  const handleClick = () => {
    router.push(`/gathering/${group.id}`);
  };

  return (
    <div
      className="
        hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white
        transition-transform duration-200
        hover:scale-[1.04] hover:z-20
        hover:shadow-[0_8px_32px_rgba(44,64,255,0.18)]
        focus:outline-none
      "
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ willChange: 'transform' }}
    >
      {/* 썸네일 */}
      <div className="relative h-[240px] w-full">
        <Image
          src={group.imageUrl || '/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-[5px] object-cover"
          priority
        />
      </div>
      {/* 콘텐츠 */}
      <div className="h-[120px] bg-[#1b1b1b] p-3">
        <h2 className="t3 mb-1">{group.title}</h2>
        <p className="mb-5 text-[14px] text-[#ffffff]">
          주최자: {group.leaderNickname ?? ""}
        </p>
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