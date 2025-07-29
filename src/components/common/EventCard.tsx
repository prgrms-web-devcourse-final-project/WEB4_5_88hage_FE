'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EventCard({ event }) {
  const router = useRouter();
  if (!event) return null;

  const handleClick = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <div
      className="hover-gradient relative w-full cursor-pointer overflow-hidden rounded-[5px] bg-black text-white"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-[240px] w-full">
        <Image
          src={event.imageUrl || '/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-lg object-cover"
          priority
        />
      </div>

      <div className="h-[120px] bg-[#1b1b1b] p-3">
        <h2 className="t3 mb-2">{event.title}</h2>
        <p className="mb-5 text-[14px] text-[#ffffff] whitespace-pre-line">
          {event.simpleExplain}
        </p>
        {event.during !== '- ~ -' && (
          <p className="text-[14px] text-[#bdbdbd]">{event.during}</p>
        )}
      </div>
    </div>
  );
}