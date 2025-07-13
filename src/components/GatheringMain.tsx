import Image from 'next/image';
import test from '@/assets/images/thinking.svg';

export default function GatheringMain() {
  return (
    <>
      <div className="bg-gray-7 mt-5 flex h-full w-full flex-col items-center rounded-[15px] p-4">
        <div className="flex w-full items-start">
          <Image
            src={test}
            width={50}
            height={50}
            alt="profileImage"
            className="rounded-full"
          />
          <div className="ml-4">
            <h1 className="h2 mb-2 text-[16px]">2025 그린 페스티벌</h1>
            <div className="bg-gray-4 t3 w-fit rounded-[30px] px-3 py-1 text-white">
              콘서트 🎤
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
