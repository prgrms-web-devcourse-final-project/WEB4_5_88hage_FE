import MainCellPhoneFrame from "../ui/MainCellPhoneFrame";
import { Ellipsis } from 'lucide-react';
import solveTitleImg3 from "@/assets/images/solve_title_img3.png"
import solvePhoneImg3 from "@/assets/images/solve_phone_img3.png"
import solvePhoneTopRightImg3 from "@/assets/images/solve_phone_top_right3.png"
import shiningStar from "@/assets/images/shining_star.png"
import Image from "next/image";


export default function ProblemSolving2(){
  return (
    <>
    <div className="w-[160px] min-w-[160px] lg:w-[285px] flex flex-col mb-[30px]">
            <div className="w-[40px] h-[40px] lg:w-[68px] lg:h-[68px] relative rotate-15">
               <Image src={solveTitleImg3} alt='고민하는 이모지' fill className="object-contain"/>
            </div>
            <p className="text-[28px] lg:text-[64px] w-full text-gray-default leading-[77px]">
                버튼 딸깍<br/>
                빠른<br/>
                <strong>
                추천
                </strong>
            </p>
        </div>
    <div className='w-full flex justify-center pb-[calc(100px+40px) relative lg:w-fit'>
        <Image src={solvePhoneTopRightImg3} alt="AI 큐큐 이미지" className="w-[140px] h-[140px] absolute top-[30px] right-[-30px] lg:right-[-120px] lg:top-[60px] rotate-10" />
        <MainCellPhoneFrame img={solvePhoneImg3} altText="지도 이미지"/>
        <div className="w-full max-w-[335px] rounded-[5px] absolute lg:bottom-[-10%] p-[1px] gradient-background lg:max-w-[335px] lg:left-[-50%] bottom-[20px]">
          <div className="w-full solve-gradient">
              <h1 className="text-[25px] font-semibold text-gray-default mb-[20px]">플레이스 추천</h1>
            <div className="flex gap-[8px] items-center">
            <div className="w-[65px] h-[65px] solve-gradient-border flex items-center justify-center">
                <Image src={shiningStar} alt="반짝이는 별 이미지" width={36} height={36}/>
            </div>
            <p className="w-fit text-gray-default">장소 탐색 중</p>
              <Ellipsis/>
            </div>
          </div>
        </div>
    </div>
    <div className="w-full flex justify-center mt-[40px] lg:mt-0 lg:w-[285px]">
       <p className="w-[335px] min-w-[310px] text-[#AEAEAE] leading-[26px] break-keep ">더 이상 뭐 할지 검색하며 시간 보내지 마세요. 클릭 몇 번으로 지금 바로 즐길 수 있는 장소를 추천해 드립니다! </p>
    </div>
    </>
  );
};