import Image from 'next/image';
import test from '@/assets/images/test.png';
import test2 from '@/assets/images/test2.png';
import testmap from '@/assets/images/testmap.png';
import { LucideChevronDown, LucideHeart, LucideMapPin } from 'lucide-react';
import GatheringHostBox from './GatheringHostBox';

export default function DetailSection() {
  return (
    <div className="flex w-160 flex-col gap-9 px-5">
      <div className="flex flex-col gap-7.5">
        <Image src={test} alt="" />
        <div className="text-2xl text-[#00e6ae]">상세 정보</div>
        <div>
          정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에
          제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다. 모든
          국민은 거주·이전의 자유를 가진다. 학교교육 및 평생교육을 포함한
          교육제도와 그 운영, 교육재정 및 교원의 지위에 관한 기본적인 사항은
          법률로 정한다. 대통령이 임시회의 집회를 요구할 때에는 기간과
          집회요구의 이유를 명시하여야 한다.
        </div>
        <button className="flex cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]">
          더보기 <LucideChevronDown />
        </button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="text-2xl text-[#00e6ae]">안내 사항</div>
        <div className="flex flex-col gap-5">
          <div>카테고리 : 음식</div>
          <div>해쉬 태그 : 술을 좋아하는, 재즈, 분위기가 좋은</div>
          <div>모임 날짜 : 2025년 7월 21일</div>
          <div>모임 위치 : 서울 동작구 상도로 지하 2</div>
        </div>
        <div>
          <Image src={testmap} alt="map" />
        </div>
      </div>
      <GatheringHostBox />
      <div className="flex flex-col gap-9">
        <div className="flex items-center justify-between">
          <div className="text-2xl text-[#00e6ae]">비슷한 모임도 있어요</div>
          <button className="cursor-pointer text-[#a1a1a1]">더보기</button>
        </div>
        <div className="flex gap-5">
          <button className="flex cursor-pointer flex-col gap-5">
            <Image src={test2} alt="" />
            <div className="flex flex-col items-baseline gap-4">
              <div className="text-xl text-[#e4e4e4]">모임 이름</div>
              <div className="flex gap-4">
                <div className="flex gap-2 text-[#b0b0b0]">
                  <LucideHeart />5
                </div>
                <div className="flex gap-2 text-[#b0b0b0]">
                  <LucideMapPin />
                  여의동
                </div>
              </div>
            </div>
          </button>
          <button className="flex cursor-pointer flex-col gap-5">
            <Image src={test2} alt="" />
            <div className="flex flex-col items-baseline gap-4">
              <div className="text-xl text-[#e4e4e4]">모임 이름</div>
              <div className="flex gap-4">
                <div className="flex gap-2 text-[#b0b0b0]">
                  <LucideHeart />5
                </div>
                <div className="flex gap-2 text-[#b0b0b0]">
                  <LucideMapPin />
                  여의동
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
