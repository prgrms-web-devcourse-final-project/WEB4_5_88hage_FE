import AdvantageTagLine from "@/components/main/AdvantageTagLine";
import AiRecommendation from "@/components/main/AiRecommendation";
import HeroCards from "@/components/main/HeroCards";
import ProblemSolving from "@/components/main/ProblemSolving";
import SlovingWrapper from '@/components/main/SlovingWrapper';

export default function MainPage(){
  return (
    <>
    <HeroCards/>
    <AdvantageTagLine/>
    <SlovingWrapper>
        <ProblemSolving/>
        <ProblemSolving/>
        <ProblemSolving/>
    </SlovingWrapper>
    <AiRecommendation/>
    </>
  );
};