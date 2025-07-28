'use client'
import Image from 'next/image';
import test from '@/assets/images/test.png';
import test2 from '@/assets/images/test2.png';
import testmap from '@/assets/images/testmap.png';
import { LucideChevronDown, LucideHeart, LucideMapPin,LucideChevronUp } from 'lucide-react';
import GatheringHostBox from '@/components/GatheringHostBox';
import Map from '@/components/kakao/Map'
import { useState } from 'react';

export default function GatheringDetail({data}:{data:any}) {
  const{relatedGroups} = data
  const [showMore,setShowMore] = useState(false);

  const applyGathering = async (id: number) => {
  try {
    const response = await fetch(`https://funfun.cloud/api/participants/${id}/apply`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP ${response.status}:`, errorText);
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log('참여 신청 성공:', result);
    return result;
  } catch (error) {
    console.error('참여 신청 실패:', error);
    throw error;
  }
};

  const dateFormatting = (date:Date) => {
          const day = date.getDate();
          const month = date.getMonth()+1;
          const year = date.getFullYear();

    return `${year}년 ${month}월 ${day}일`
  }
  return (
    <div className="eventDetail-gradient flex w-screen min-w-screen justify-center bg-[#121212] lg:w-340">
      <div className="hidden h-full min-h-screen py-15 text-[#f6f6f6] lg:flex">
        <div className="flex w-160 flex-col gap-9 px-5">
          <div className={`w-full h-fit`}>
              <Image src={test} alt={`${data.title} 포스트 이미지`} width={800} height={500} className="w-full h-auto object-cover"/>
          </div>
          <div className="flex flex-col gap-7.5">
            <div className="text-2xl text-[#00e6ae]">상세 정보</div>
            <div className={`overflow-hidden h-fit ${showMore ? 'max-h-none' : 'max-h-[50px]'}`}>
              {data.explain}
            </div>
            {showMore ?<button onClick={()=> {
              setShowMore(false)}} className="flex cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3] w-full">접기 <LucideChevronUp /></button>:<button onClick={()=> setShowMore(true)} className="flex cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3] w-full">더보기 <LucideChevronDown /></button>}
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-2xl text-[#00e6ae]">안내 사항</div>
            <div className="flex flex-col gap-5">
              <div>카테고리 : {data.category}</div>
              <div>해쉬 태그 : {data.hashTags.join(', ')}</div>
              <div>모임 날짜 : {dateFormatting(new Date(data.groupDate))}</div>
              <div>모임 위치 : {data.address}</div>
            </div>
            <div>
              <Map lat={data.latitude} lng={data.longitude} width='100%' height='280px'/>
            </div>
          </div>
          <GatheringHostBox hostName={data.leaderNickname} hostEmail={data.leaderEmail} tags={data.leaderHashTags} hostExplain={data.leaderExplain}/>
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-2xl text-[#00e6ae]">
                비슷한 모임도 있어요
              </div>
              <button className="cursor-pointer text-[#a1a1a1]">더보기</button>
            </div>
            <div className="flex gap-5">
              {relatedGroups.map((data:any) => {
                              return (
                              <div key={data.id}  className="flex cursor-pointer flex-col w-[calc(50%-10px)] max-w-[calc(50%-10px)]">
                              <div className='w-[100%] h-[235px] overflow-hidden relative'>
                                <Image src={test} alt="포스트 이미지" width={290} height={235} className="w-full object-contain"/>
                              </div>
                              <div>
                                <div className="text-[16px] text-[#e4e4e4] truncate text-start mb-[15px]">{data.title}</div>
                                <div className="flex gap-4">
                                  <div className="flex gap-2 text-[#b0b0b0] text-[16px]">
                                    <LucideMapPin size={16} className='mt-[4px]'/>
                                    {data.address}
                                  </div>
                                </div>
                              </div>
                            </div>)
                })}
            </div>
          </div>
        </div>
        <div className="sticky top-8 h-full w-160 px-5">
          <div className="flex flex-col self-start rounded-sm bg-[#1c1c1c] p-6">
            <div className="flex flex-col gap-5 mb-[30px]">
              <div className="gradient-border self-start px-6 py-2.5">
                음식 🍔
              </div>
              <div className="gradient-text text-3xl font-bold">
                {data.title}
              </div>
              <div className="flex gap-2">
                {data.hashTags.map((el,idx) => <div key={idx}  className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">#{el}</div>)}
              </div>
            </div>
            <div className='border-t border-t-[#2D2A2A] py-[30px]'>
              {data.simpleExplain}
            </div>
            <button onClick={()=>applyGathering(data.id)} className="cursor-pointer rounded-sm bg-[#2a2a2a] p-4 text-3xl">
              <span className="gradient-text">모임 신청</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[41px] lg:hidden">
        <div className="flex w-full flex-col gap-7.5 self-start rounded-sm bg-[#1c1c1c] p-6">
          <div className="mt-[61px] mb-[59px] flex flex-col items-center gap-5 text-white">
            <div className="gradient-border px-6 py-2.5">음식 🍔</div>
            <div className="gradient-text text-xl font-bold">
              {data.title}
            </div>
            <div className="flex gap-2">
              {/* {data.hashTags.map((el,idx)=> <div className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]" key={idx}>#{el}</div> )} */}
              <div className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                #태그
              </div>
              <div className="rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[#e4e4e4]">
                #태그
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9 px-5 text-white">
          <div className="flex w-full flex-col items-center gap-7.5">
            <Image src={test} alt="" />
            <div className="self-start text-xl text-[#00e6ae]">상세 정보</div>
            <div>
              {data.explain}
            </div>
            <button className="flex w-full cursor-pointer justify-center gap-2 bg-[#1c1c1c] p-5 text-[#c3c3c3]">
              더보기 <LucideChevronDown />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-xl text-[#00e6ae]">안내 사항</div>
            <div className="flex flex-col gap-5">
              <div>카테고리 : 음식</div>
              <div>해쉬 태그 : 술을 좋아하는, 재즈, 분위기가 좋은</div>
              <div>모임 날짜 : 2025년 7월 21일</div>
              <div>모임 위치 : {data.address}</div>
            </div>
            <div className="flex w-full justify-center">
              <Image src={testmap} alt="map" />
            </div>
          </div>
          {/* <GatheringHostBox /> */}
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="text-xl text-[#00e6ae]">비슷한 모임도 있어요</div>
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
          <span className="gradient-text">모임 신청</span>
        </button>
      </div>
    </div>
  );
}
