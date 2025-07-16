import Image from 'next/image';
import logo from '@/assets/images/logo.svg';

export default function Footer() {
  return (
    <>
      <div className="w-[375px] p-4 lg:w-full pl-50 bg-[#1c1c1c]">
        <div className="relative h-[24px] w-[60px] lg:h-[40px] lg:w-[100px]">
          <Image
            alt="logo"
            src={logo}
            fill
            style={{ objectFit: 'contain' }}
            sizes="60px, 100px"
            priority
          />
        </div>
        <div className="t3 mt-3 text-white">
          모든 즐거움이 시작되는 곳,
          <br />
          함께해서 더욱 빛나는 우리들의 이야기.
          <br />
          지금, funfun에서 새로운 경험을 만나보세요.
        </div>
        <hr className="my-4 mr-4 text-[#393939] lg:mr-0 lg:mb-7" />
        <div className="t4 text-white">
          <span>@2025 Funfun Inc. All rights reserved</span>
          <div className="font-extrabold lg:ml-30 lg:inline">
            개인정보 취급방침 | 이용약관 | 위치 기반 서비스 이용약관
          </div>
        </div>
      </div>
    </>
  );
}