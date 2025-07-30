'use client';
import GrayButton from '@/components/button/GrayButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center lg:flex-row">
      <div className="w-[230px] lg:w-[330px]">
        <Image
          src={`/hip-girl-thinking.svg`}
          alt="404"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="mt-4 flex flex-col items-center lg:mt-0 lg:ml-[-30px] lg:items-start">
        <div className="hidden lg:block">🤔</div>
        <div className="text-main h3">페이지를 찾을 수 없습니다.</div>
        <p className="t4 mt-4 text-center text-[#e8e8e8] md:text-left">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.
          <br />
          입력한 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>

        <button
          className="bg-main mt-4 hidden rounded-2xl px-4 py-1 font-semibold lg:block"
          onClick={() => router.push('/')}
        >
          홈으로 가기
        </button>
        <GrayButton
          className="absolute bottom-0 mb-3 w-11/12 lg:hidden"
          onClick={() => router.push('/')}
        >
          홈으로 가기
        </GrayButton>
      </div>
    </div>
  );
}
