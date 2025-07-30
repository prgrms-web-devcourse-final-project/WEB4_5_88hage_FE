import AdvantageTagLine from "@/components/main/AdvantageTagLine";
import AiRecommendation from "@/components/main/AiRecommendation";
import HeroCards from "@/components/main/HeroCards";
import ProblemSolving from "@/components/main/ProblemSolving";
import ProblemSolving2 from "@/components/main/ProblemSolving2";
import ProblemSolving3 from "@/components/main/ProblemSolving3";
import SlovingWrapper from '@/components/main/SlovingWrapper';

export default function MainPage(){
  return (
    <>
    <HeroCards/>
    <AdvantageTagLine/>
    <SlovingWrapper>
        <ProblemSolving/>
        <ProblemSolving2/>
        <ProblemSolving3/>
    </SlovingWrapper>
    <AiRecommendation/>
    </>
  );
};