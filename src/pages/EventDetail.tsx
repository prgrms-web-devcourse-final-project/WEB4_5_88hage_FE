import Image from 'next/image';
import test from '@/assets/images/test.png';
import test2 from '@/assets/images/test2.png';
import testmap from '@/assets/images/testmap.png';
import {
  LucideChevronDown,
  LucideHeart,
  LucideMapPin,
  LucideLink2,
} from 'lucide-react';
import GatheringHostBox from '@/components/GatheringHostBox';

export default function EventDetail() {
  return (
    <div className="eventDetail-gradient flex w-screen min-w-screen justify-center bg-[#121212] lg:w-340">
      <div className="hidden h-full min-h-screen py-15 text-[#f6f6f6] lg:flex">
        <div className="flex w-160 flex-col gap-10 px-5">
          <div className="flex flex-col gap-7.5">
            <Image src={test} alt="" />
            {/* <div>
              정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지
              국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야
              한다. 모든 국민은 거주·이전의 자유를 가진다. 학교교육 및
              평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에
              관한 기본적인 사항은 법률로 정한다. 대통령이 임시회의 집회를
              요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.
            </div> */}
            <button className="flex cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]">
              더보기 <LucideChevronDown />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-2xl text-[#00e6ae]">안내 사항</div>
            <div className="mb-[18px] flex flex-col gap-[23px]">
              <div>카테고리 : 음식</div>
              <div>행사 날짜 : 2025년 07월 21일 ~ 2025년 07월 25일</div>
              <div>행사 장소 : 경기도 어쩌구 저쩌구 어디 어디 축구장</div>
              <div>행사 시간 : 9시간</div>
              <div>나이 제한 : 만 19세 이상</div>
              <div>시작 시간 : 금요일 13:00, 토요일 - 일요일 13:00</div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="text-main text-2xl">찾아 오시는 길</div>
              <Image src={testmap} alt="map" />
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-main text-2xl">
                비슷한 행사 추천 해드려요
              </div>
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
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-main text-2xl">
                주변에 가까운 행사 추천 해드려요
              </div>
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
        <div className="sticky top-8 h-full w-160 px-5">
          <div className="flex flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] p-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="gradient-border self-start px-6 py-1.5">
                  음식 🍔
                </div>
                <div className="text-[#777777]">2025년 7월 19일</div>
              </div>
              <div className="gradient-text text-3xl font-bold">
                워터밤 [서울]
              </div>
              <div className="flex gap-5">
                <span>경기도</span>
                <span>2025년 7월 19일 - 2025년 7월 21일</span>
              </div>
              <div className="flex gap-2">
                <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                  멜론 티켓 <LucideLink2 />
                </div>
                <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                  멜론 티켓 <LucideLink2 />
                </div>
              </div>
            </div>
            {/* <hr className="text-[#2d2d2d]" /> */}
            <button className="mt-[17px] cursor-pointer rounded-sm bg-[#2a2a2a] p-4 text-3xl">
              <span className="gradient-text">일정 등록</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[41px] text-white lg:hidden">
        <div className="flex w-full flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] pt-[69px] pb-[24px]">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center justify-between">
              <div className="gradient-border self-start px-6 py-1.5">
                음식 🍔
              </div>
              {/* <div className="text-[#777777]">2025년 7월 19일</div> */}
            </div>
            <div className="gradient-text text-xl font-bold">워터밤 [서울]</div>
            <div className="text-[#777777]">2025년 7월 19일</div>
            <div className="flex gap-2">
              <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                멜론 티켓 <LucideLink2 />
              </div>
              <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                멜론 티켓 <LucideLink2 />
              </div>
              <div className="gradient-border flex gap-2 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                멜론 티켓 <LucideLink2 />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-10 px-5">
          <div className="flex flex-col gap-7.5">
            <Image src={test} alt="" />
            {/* <div>
              정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지
              국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야
              한다. 모든 국민은 거주·이전의 자유를 가진다. 학교교육 및
              평생교육을 포함한 교육제도와 그 운영, 교육재정 및 교원의 지위에
              관한 기본적인 사항은 법률로 정한다. 대통령이 임시회의 집회를
              요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.
            </div> */}
            <button className="flex cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]">
              더보기 <LucideChevronDown />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-2xl text-[#00e6ae]">안내 사항</div>
            <div className="mb-[18px] flex flex-col gap-[23px]">
              <div>카테고리 : 음식</div>
              <div>행사 날짜 : 2025년 07월 21일 ~ 2025년 07월 25일</div>
              <div>행사 장소 : 경기도 어쩌구 저쩌구 어디 어디 축구장</div>
              <div>행사 시간 : 9시간</div>
              <div>나이 제한 : 만 19세 이상</div>
              <div>시작 시간 : 금요일 13:00, 토요일 - 일요일 13:00</div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="text-main text-xl lg:text-2xl">
                찾아 오시는 길
              </div>
              <Image src={testmap} alt="map" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-main text-xl lg:text-2xl">
                비슷한 행사 추천해드려요
              </div>
              <button className="cursor-pointer text-[#a1a1a1]">더보기</button>
            </div>
            <div className="flex justify-center gap-5">
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
              <button className="hidden cursor-pointer flex-col gap-5 sm:flex">
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
          <div className="flex w-full flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-main text-lg lg:text-2xl">
                주변에 가까운 행사 추천
              </div>
              <button className="cursor-pointer text-[#a1a1a1]">더보기</button>
            </div>
            <div className="flex justify-center gap-5">
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
              <button className="hidden cursor-pointer flex-col gap-5 sm:flex">
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
        <button className="m-[20px] cursor-pointer rounded-sm bg-[#2a2a2a] p-4 text-3xl">
          <span className="gradient-text">일정 등록</span>
        </button>
      </div>
    </div>
  );
}
