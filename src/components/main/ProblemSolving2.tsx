import MainCellPhoneFrame from "../ui/MainCellPhoneFrame";
import { Ellipsis } from 'lucide-react';
import solveTitleImg2 from "@/assets/images/solve_title_img2.png"
import solvePhoneImg2 from "@/assets/images/solve_phone_img2.png"
import solvePhoneTopRightImg2 from "@/assets/images/solve_phone_top_right2.png"
import shiningStar from "@/assets/images/shining_star.png"
import Image from "next/image";

export default function ProblemSolving2(){
  return (
    <>
    <div className="w-[160px] min-w-[160px] lg:w-[279px] flex flex-col mb-[30px]">
            <div className="w-[36px] h-[36px] lg:w-[68px] lg:h-[68px] relative">
               <Image src={solveTitleImg2} alt='고민하는 이모지' fill className="object-contain"/>
            </div>
            <p className="text-[36px] lg:text-[64px] w-full text-gray-default leading-[77px]">
                데이트<br/>
                고민은
                <strong>
                STOP!
                </strong>
            </p>
        </div>
    <div className='w-full flex justify-center pb-[calc(100px+40px) relative lg:w-fit'>
        <Image src={solvePhoneTopRightImg2} alt="하트 이미지" className="w-[140px] h-[140px] absolute top-[30px] right-[-30px] lg:right-[-120px] lg:top-[60px] rotate-20" />
        <MainCellPhoneFrame img={solvePhoneImg2} altText="놀이공원 데이트하는 이미지"/>
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
    <div className="w-full flex justify-center mt-[40px] lg:mt-0 lg:w-[279px]">
       <p className="w-[335px] min-w-[310px] text-[#AEAEAE] leading-[26px] break-keep ">더 이상 뭐 할지 검색하며 시간 보내지 마세요. 클릭 몇 번으로 지금 바로 즐길 수 있는 장소를 추천해 드립니다! </p>
    </div>
    </>
  );
};