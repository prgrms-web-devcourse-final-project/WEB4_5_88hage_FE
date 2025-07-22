import { EllipsisVertical, Users2 } from 'lucide-react';
import Image from 'next/image';

interface MainPostHeaderProps {
  title: string;
  category: string;
  memberCount: number;
  groupImageUrl: string;
}

export default function MainPostHeader({
  title,
  category,
  memberCount,
  groupImageUrl,
}: MainPostHeaderProps) {
  return (
    <>
      <div className="flex items-start lg:items-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={groupImageUrl || '/hip-girl-thinking.svg'}
            alt="group image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="ml-4 lg:flex lg:items-center">
          <h1 className="gradient-text h2 mb-2 text-[16px] lg:mb-0 lg:text-[24px]">
            {title}
          </h1>
          <div className="bg-gray-4 t3 flex w-fit items-center gap-2 rounded-[30px] px-3 py-1 text-white lg:ml-5">
            {category}
          </div>
        </div>

        <div className="text-gray-disabled ml-auto flex items-center gap-2">
          <div className="t3 hidden lg:block">{memberCount}명</div>
          <Users2 className="h-[20px] w-[20px]" />
          <EllipsisVertical className="h-[20px] w-[20px]" />
        </div>
      </div>
      <hr className="text-gray-disabled mt-5" />
    </>
  );
}
