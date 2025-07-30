'use client';
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import test from '@/assets/images/test.png';
import test2 from '@/assets/images/test2.png';
import testmap from '@/assets/images/testmap.png';
import {
  LucideChevronDown,
  LucideHeart,
  LucideMapPin,
  LucideLink2,
  LucideChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import moment from 'moment';
import Map from '@/components/kakao/Map';
import SelectDate from '@/components/common/SelectDate';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { filterContentCategory } from '@/lib/utils/filterCategory';
import Spinner from '@/components/common/Spinner';

export default function EventDetail({ data }: { data: EventData }) {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const route = useRouter();
  const { content, related, nearby } = data;

  const routing = (id: number) => {
    route.push(`/event/${id}`);
  };

  const relatedArr = [related[0], related[1]];
  const nearbyArr = [nearby[0], nearby[1]];

  const dateFormatting = (date: string) => {
    return moment(date).format('YYYY년 MM월 DD일');
  };

  if(!data){
    return <Spinner/>
  }

  return (
    <div className="eventDetail-gradient flex w-screen min-w-screen justify-center bg-[#121212] lg:w-340">
      <div className="hidden h-full min-h-screen py-15 text-[#f6f6f6] lg:flex">
        <div className="flex w-160 flex-col gap-10 px-5">
          <div
            className={`flex flex-col gap-[20px] overflow-hidden ${showMore ? 'h-fit' : 'h-[300px]'}`}
          >
            <Image
              src={content.poster}
              alt={content.contentTitle}
              width={800}
              height={500}
              className="h-auto w-full object-cover"
            />
            {content.images.map((img) => (
              <Image
                key={img.id}
                src={img.imageUrl}
                alt={content.contentTitle}
                width={800}
                height={500}
                className="h-auto w-full object-cover"
              />
            ))}
          </div>
          {showMore ? (
            <button
              onClick={() => {
                window.scrollTo({ top: 0 });
                setShowMore(false);
              }}
              className="flex w-full cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]"
            >
              접기 <LucideChevronUp />
            </button>
          ) : (
            <button
              onClick={() => setShowMore(true)}
              className="flex w-full cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]"
            >
              더보기 <LucideChevronDown />
            </button>
          )}
          <div className="flex flex-col gap-8">
            <div className="text-2xl text-[#00e6ae]">안내 사항</div>
            <div className="mb-[18px] flex flex-col gap-[23px]">
              {content.category && (
                <div>카테고리 : {filterContentCategory(content.category)}</div>
              )}
              {content.startDate && content.endDate && (
                <div>
                  행사 날짜 : {dateFormatting(content.startDate)} ~{' '}
                  {dateFormatting(content.endDate)}
                </div>
              )}
              {content.address && <div>행사 장소 : {content.address}</div>}
              {content.runTime && <div>행사 시간 : {content.runTime}</div>}
              {content.fee && <div>이용 요금 : {content.fee}</div>}
              {content.age && <div>나이 제한 : {content.age}</div>}
              {content.time && <div>시작 시간 : {content.time}</div>}
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="text-main text-[24px]">찾아 오시는 길</div>
              <Map
                lat={content.latitude}
                lng={content.longitude}
                width="100%"
                height="280px"
              />
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-main text-2xl">
                비슷한 행사 추천 해드려요
              </div>
              <button
                onClick={() =>
                  route.push(
                    `event?category=${content.category}&type=${content.eventType}`,
                  )
                }
                className="cursor-pointer text-[#a1a1a1]"
              >
                더보기
              </button>
            </div>
            <div className="flex gap-5">
              {relatedArr.map((data) => {
                return (
                  <div
                    onClick={() => routing(data.id)}
                    key={data.id}
                    className="flex w-[calc(50%-10px)] max-w-[calc(50%-10px)] cursor-pointer flex-col gap-5"
                  >
                    <div className="relative h-[235px] w-[100%] overflow-hidden">
                      <Image
                        src={data.poster}
                        alt="포스트 이미지"
                        fill
                        className="w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="mb-[15px] truncate text-start text-[16px] text-[#e4e4e4]">
                        {data.contentTitle}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center gap-2 text-[16px] text-[#b0b0b0]">
                          <LucideMapPin size={16} />
                          {data.guname}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div
                className="text-main text-2xl"
              >
                주변에 가까운 행사 추천 해드려요
              </div>
              <button onClick={() => route.push('/event')} className="cursor-pointer text-[#a1a1a1]">더보기</button>
            </div>
            <div className="flex gap-5">
              {nearbyArr.map((data) => {
                return (
                  <div
                    onClick={() => routing(data.id)}
                    key={data.id}
                    className="flex w-[calc(50%-10px)] max-w-[calc(50%-10px)] cursor-pointer flex-col"
                  >
                    <div className="relative mb-[20px] h-[235px] w-[100%] overflow-hidden">
                      <Image
                        src={data.poster}
                        alt="포스트 이미지"
                        fill
                        className="w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="mb-[15px] truncate text-start text-[16px] text-[#e4e4e4]">
                        {data.contentTitle}
                      </div>
                      <div className="flex gap-4">
                        <div className="text-[16px flex gap-2 text-[#b0b0b0]">
                          <LucideMapPin size={16} className="mt-[4px]" />
                          {data.guname}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sticky top-8 h-full w-160 px-5">
          <div className="flex flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] p-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="gradient-border self-start px-6 py-1.5">
                  {filterContentCategory(content.category)}
                </div>
              </div>
              <div className="gradient-text text-3xl font-bold">
                {content.contentTitle}
              </div>
              <div className="flex gap-5">
                {content.area && <span>{content.area}</span>}
                <span>
                  {dateFormatting(content.startDate)} -{' '}
                  {dateFormatting(content.endDate)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-t-[#2D2A2A] pt-6">
                {content.urls.map((data) => (
                  <button
                    key={data.id}
                    className="gradient-border flex rounded-full bg-[#2a2a2a] px-[15px] py-[5px] text-[#e4e4e4]"
                  >
                    <Link href={data.url} className="flex gap-[5px]">
                      {data.siteName} <LucideLink2 />
                    </Link>
                  </button>
                ))}
              </div>
            </div>
            {/* <hr className="text-[#2d2d2d]" /> */}
            <button
              onClick={() => setShow(true)}
              className="cursor-pointer rounded-sm bg-[#2a2a2a] p-4 text-3xl"
            >
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
                {filterContentCategory(content.category)}
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
              <button
                onClick={() =>
                  route.push(
                    `/event?category=${related[0].category}&type=${related[0].eventType}`,
                  )
                }
                className="cursor-pointer text-[#a1a1a1]"
              >
                더보기
              </button>
            </div>
            <div className="flex justify-center gap-5">
              <button className="flex cursor-pointer flex-col gap-5">
                <Image src={test2} alt="" />
                <div className="flex flex-col items-baseline gap-4">
                  <div className="text-xl text-[#e4e4e4]">모임 이름</div>
                  <div className="flex gap-4">
                    <div className="flex gap-2 text-[#b0b0b0]">
                      <LucideHeart />
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
              <button
                onClick={() => route.push(`/event`)}
                className="cursor-pointer text-[#a1a1a1]"
              >
                더보기
              </button>
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
      {show && (
        <SelectDate
          title={content.contentTitle}
          id={content.id}
          setShow={setShow}
          show={show}
        />
      )}
    </div>
  );
}
