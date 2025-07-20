import Image, { StaticImageData } from 'next/image';

type gatheringProps = {
  profileUrl: string | StaticImageData;
  name: string;
  info: string;
  time: string;
};

export default function GatheringItem({
  profileUrl,
  name,
  info,
  time,
}: gatheringProps) {
  return (
    <div className="hover:bg-gray-5 flex w-full items-start justify-between rounded-[4px] px-3 py-3 transition">
      {/* 프로필 사진 */}
      <div className="flex items-center gap-3">
        <Image
          src={profileUrl}
          alt={'모임 정보'}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">{name}</span>
          <span className="t4 text-gray-disabled mt-1">{info}</span>
        </div>
      </div>
      {/* 시간 */}
      <span className="t4 text-gray-disabled">{time}</span>
    </div>
  );
}
