import Image from "next/image";
import shiningStar from "@/assets/images/shining_star.png"
import balloon from "@/assets/images/balloon.png"
import target from "@/assets/images/target.png"
import good from "@/assets/images/good.png"


export default function AdvantageTagLine(){
  return (
    <>
    <section className="text-[36px] lg:text-[80px] text-gray-default font-semibold flex items-center flex-col min-w-[335px] lg:min-w-[1580px]">
        <div className="w-fit">
            <p className="flex items-center">취향에 딱 맞는 모임 추천 <Image src={good} alt="엄지 올린 이미지" className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"/></p>
        </div>
        <div className="w-fit">
            <p className="flex flex-col justify-center items-center lg:flex-row">
            <span className="flex">
                <Image src={shiningStar} alt="별빛 이미지" className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"/>바로 근처에,
            </span>
            <span className="flex">
                내 취향에 딱 맞는 컨텐츠<Image src={balloon} alt="풍선 이미지" className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"/>
            </span>
            </p>
        </div>
        <div className="flex w-fit">
            <p className="flex items-center flex-col lg:flex-row">
                <span>
                    <span className="gradient-text">AI 큐큐</span> 추천 취향 맞춤
                </span>
                <Image src={target} className="w-[110px] h-[110px] lg:w-[184px] lg:h-[184px]" alt="과녁 이미지"/>
                <span>
                    플레이스
                </span>
            </p>
        </div>
    </section>

    </>
  );
};