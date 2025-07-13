import Image from 'next/image';
import test from '@/assets/images/thinking.svg';
import { EllipsisVertical, Users2 } from 'lucide-react';
import Tag from './common/Tag';

export default function GatheringMain() {
  return (
    <>
      <div className="bg-gray-7 mt-5 flex h-full w-full flex-col rounded-[15px] p-4">
        <div className="flex items-start">
          <Image
            src={test}
            width={50}
            height={50}
            alt="profileImage"
            className="rounded-full"
          />
          <div className="ml-4">
            <h1 className="gradient-text h2 mb-2 text-[16px]">
              2025 그린 페스티벌
            </h1>
            <div className="bg-gray-4 t3 w-fit rounded-[30px] px-3 py-1 text-white">
              콘서트 🎤
            </div>
          </div>

          <div className="text-gray-disabled ml-auto flex items-center">
            <Users2 className="h-[20px] w-[20px]" />
            <EllipsisVertical className="h-[20px] w-[20px]" />
          </div>
        </div>
        <hr className="text-gray-disabled mt-5" />
        <div className="mt-5 flex gap-5">
          <Tag />
          <Tag />
        </div>
      </div>
    </>
  );
}
