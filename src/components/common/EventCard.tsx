'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EventCard({
  event,
}: {
  event: {
    id: number;
    title: string;
    simpleExplain: string;
    during: string;
    imageUrl: string;
    address: string | undefined;
    eventType: string | undefined;
  };
  className?: string;
}) {
  const router = useRouter();
  if (!event) return null;

  const handleClick = () => {
    router.push(`/event/${event.id}`);
  };

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
          src={event.imageUrl || '/hip-girl-thinking.svg'}
          alt="썸네일"
          fill
          className="rounded-t-[5px] object-cover"
          priority
        />
      </div>

      <div className="bg-[#1b1b1b] px-[19px] py-[19px] h-[120px] flex flex-col justify-between">
        <h2
          className="text-[18px] font-semibold leading-tight mb-[7px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={event.title}
        >
          {event.title}
        </h2>
        <p
          className="text-[14px] text-[#bdbdbd] mb-[7px] overflow-hidden text-ellipsis whitespace-nowrap"
          title={event.simpleExplain}
        >
          {event.simpleExplain || ''}
        </p>
        {!!event.during && event.during !== '- ~ -' && (
          <p className="text-[14px] text-[#bdbdbd] whitespace-nowrap overflow-hidden text-ellipsis">
            {event.during}
          </p>
        )}
      </div>
    </div>
  );
}