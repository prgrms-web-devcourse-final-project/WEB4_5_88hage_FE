import Image from 'next/image';

type ChatItemProps = {
  imageUrl: string | undefined;
  name: string;
  lastMessage: string;
  time: string | undefined;
  onClick?: () => void;
};

export default function ChatItem({
  imageUrl,
  name,
  lastMessage,
  time,
  onClick,
}: ChatItemProps) {
  return (
    <div
      className="hover:bg-gray-5 flex w-full cursor-pointer items-start justify-between rounded-[4px] px-2 py-2 transition"
      onClick={onClick}
    >
      {/* 프로필 사진 */}
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-500 text-xs text-white">
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">{name}</span>
          <span className="t4 text-gray-disabled mt-1">{lastMessage}</span>
        </div>
      </div>
      {/* 시간 */}
      <span className="t4 text-gray-disabled">{time}</span>
    </div>
  );
}
