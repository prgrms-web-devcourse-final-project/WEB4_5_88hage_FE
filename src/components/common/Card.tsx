'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Group = {
  id: number;
  title: string;
  imageUrl: string;
  leaderNickname: string;
  groupDate: string;
  simpleExplain?: string;
  reason?: string;
};

type PostCardProps = {
  group: Group;
  className?: string;
};

export default function PostCard({ group }: PostCardProps) {
  const router = useRouter();
  if (!group) return null;

  const handleClick = () => {
    router.push(`/gathering/${group.id}`);
  };

  const dateString = group.groupDate
    ? (() => {
        const d = group.groupDate.split('T')[0].split('-');
        return `${d[1]}.${d[2]}`;
      })()
    : '미정';

  return (
    <div
      className="hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white transition-transform duration-200 hover:z-20 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(44,64,255,0.18)] focus:outline-none"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ willChange: 'transform' }}
    >
      <div className="relative h-[240px] w-full">
        <Image
          src={group.imageUrl || '/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-[5px] object-cover"
          priority
        />
      </div>
      <div className="bg-[#1b1b1b] px-[19px] py-[19px] h-[120px] flex flex-col justify-between">
        <h2
          className="text-[18px] font-semibold leading-tight mb-[7px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={group.title}
        >
          {group.title}
        </h2>
        <p
          className="text-[14px] text-[#bdbdbd] mb-[7px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={group.leaderNickname}
        >
          주최자: {group.leaderNickname ?? ''}
        </p>
        <p className="text-[14px] text-[#bdbdbd] whitespace-nowrap overflow-hidden text-ellipsis">
          {dateString}
        </p>
      </div>
    </div>
  );
}