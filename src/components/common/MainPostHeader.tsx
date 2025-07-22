import { EllipsisVertical, Users2 } from 'lucide-react';
import Image from 'next/image';
import test from '@/assets/images/thinking.svg';

interface MainPostHeaderProps {
  title: string;
}

export default function MainPostHeader({ title }: MainPostHeaderProps) {
  return (
    <>
      <div className="flex items-start lg:items-center">
        <Image
          src={test}
          width={50}
          height={50}
          alt="profileImage"
          className="rounded-full"
        />
        <div className="ml-2 lg:flex lg:items-center">
          <h1 className="gradient-text h2 mb-2 text-[16px] lg:mb-0 lg:text-[24px]">
            {title}
          </h1>
          <div className="bg-gray-4 t3 w-fit rounded-[30px] px-3 py-1 text-white lg:ml-5">
            콘서트 🎤
          </div>
        </div>

        <div className="text-gray-disabled ml-auto flex items-center gap-2">
          <div className="t3 hidden lg:block">3명</div>
          <Users2 className="h-[20px] w-[20px]" />
          <EllipsisVertical className="h-[20px] w-[20px]" />
        </div>
      </div>
      <hr className="text-gray-disabled mt-5" />
    </>
  );
}
