import Image from 'next/image';

interface GatheringItemProps {
  name: string;
  description: string | undefined;
  imageUrl: string | undefined;
  onClick: () => void;
}

export default function GatheringItem({
  name,
  description,
  imageUrl,
  onClick,
}: GatheringItemProps) {
  return (
    <div
      className="border-gray-6 flex cursor-pointer items-center space-x-3 border-b p-2 last:border-b-0"
      onClick={onClick}
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-500 text-xs text-white">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-white">{name}</h3>
        <p className="text-gray-disabled t4 mt-1 truncate">{description}</p>
      </div>
    </div>
  );
}
