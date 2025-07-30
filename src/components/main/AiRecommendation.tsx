'use client'
import Image from "next/image";
import shiningStar from "@/assets/images/shining_star.png"
import { useRouter } from "next/navigation";

export default function AiRecommendation(){
  const router = useRouter()
  return (
    <>
    <section className="gradient-background w-full pt-[60px] pb-[80px] lg:py-[163px] flex flex-col items-center">
        <p className="text-gray-default text-center font-semibold mb-[30px] lg:text-[48px] text-[20px]">안녕 큐큐! 지금 근처에서<br/>내 취향에 딱 맞는 컨텐츠 추천해 줘!</p>
        <button className="w-[284px] h-[50px] button-gradient-border bg-gray-default flex justify-center items-center text-[24px]">
            <p onClick={()=> router.push('/event')} className="gradient-text font-semibold flex gap-[5px] items-center">
            추천 받으러 가기<Image src={shiningStar} alt="반짝이는 별빛 이미지" width={26} height={26}  style={{ height: '26px' }} priority/>
            </p>
        </button>
    </section>
    </>
  );
};