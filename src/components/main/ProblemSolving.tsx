import MainCellPhoneFrame from "../ui/MainCellPhoneFrame";
import { Ellipsis } from 'lucide-react';
import SolveTitle from "../ui/SolveTitle";
import solveTitleImg1 from "@/assets/images/solve_title_img1.png"
import solvePhonoImg1 from "@/assets/images/solve_phone_img1.png"
import solvePhoneTopRightImg1 from "@/assets/images/solve_phone_top_right1.png"
import shiningStar from "@/assets/images/shining_star.png"
import Image from "next/image";

export default function ProblemSolving(){
  return (
    <>
    <section className="my-[100px] px-[10px] lg:flex lg:items-center lg:justify-around lg:h-screen">
    <SolveTitle img={solveTitleImg1} altText="손으로 막는 이미지" text="심심할 때 고민은" strongText="STOP!"/>
    <div className='w-full flex justify-center pb-[calc(100px+40px) relative lg:w-fit'>
        <Image src={solvePhoneTopRightImg1} alt="하품하는 이미지" className="w-[115px] h-[115px] absolute top-[30px] right-[-10px] lg:right-[-60px]" />
        <MainCellPhoneFrame img={solvePhonoImg1} altText="심심한 이미지"/>
        <div className="w-full max-w-[335px] rounded-[5px] absolute lg:bottom-[-10%] p-[1px] gradient-background lg:max-w-[335px] lg:left-[-50%] bottom-[20px]">
          <div className="w-full solve-gradient">
              <h1 className="text-[25px] font-semibold text-gray-default mb-[20px]">컨텐츠 찾기</h1>
            <div className="flex gap-[8px] items-center">
            <div className="w-[65px] h-[65px] solve-gradient-border flex items-center justify-center">
                <Image src={shiningStar} alt="반짝이는 별 이미지" width={36} height={36}/>
            </div>
            <p className="w-fit text-gray-default">컨텐츠 탐색 중</p>
              <Ellipsis/>
            </div>
          </div>
        </div>
    </div>
    <div className="w-full flex justify-center mt-[40px] lg:mt-0 lg:w-[160px]">
       <p className="w-[335px] min-w-[310px] text-[#AEAEAE] leading-[26px] break-keep ">더 이상 뭐 할지 검색하며 시간 보내지 마세요. AI 큐큐를 활용해서 지금 바로 즐길 수 있는 컨텐츠를 추천 해드릴게요!</p>
    </div>
    </section>
    </>
  );
};