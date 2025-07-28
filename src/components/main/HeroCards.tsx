'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import hero1 from '@/assets/images/hero1.png';
import emoji from '@/assets/images/emoji1.png';
import heart from '@/assets/images/heart.png';
import thunder from '@/assets/images/thunder.png';
import AdvantageTagLine from './AdvantageTagLine';
import ProblemSolving from './ProblemSolving';
import AiRecommendation from './AiRecommendation';
import SlovingWrapper from './SlovingWrapper';


const MotionImage = motion(Image);

// ── 그리드 설정 ───────────────────────────────────────
const CARD_COUNT = 15;                   // 총 카드 개수
const COLS       = 5;                    // 한 줄(행)에 배치할 카드 수
const H_GAP      = 335;                  // 카드 간 기본 가로 간격(px)
const V_GAP      = 475;                  // 카드 간 기본 세로 간격(px)
const ROWS       = Math.ceil(CARD_COUNT / COLS);
const CENTER_COL = (COLS - 1) / 2;
const CENTER_ROW = (ROWS - 1) / 2;

// ── 각 카드별 펼쳐질 위치(x,y) 계산 ────────────────────
const OFFSETS = Array.from({ length: CARD_COUNT }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;

  // 기본 X/Y 오프셋
  const baseX = (col - CENTER_COL) * H_GAP;
  const baseY = (row - CENTER_ROW) * V_GAP;

  // 세로 스태거: 2,4,…번째 열만 V_GAP/2 만큼 Y축으로 추가 이동
  const staggerY = col % 2 === 1 ? V_GAP / 2 : 0;

  return {
    x: baseX,
    y: baseY + staggerY,
  };
});

export default function CardSpread() {
  const { scrollY } = useScroll();
  const [expanded, setExpanded] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ width: 240, transition: { duration: 0.2, ease: 'easeOut' } });
  }, [controls]);

  const taglineOpacity = useTransform(scrollY, [100, 400], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {

      if (y > 200 && !expanded) {
        setExpanded(true);
      } else if (y <= 200 && expanded) {
        setExpanded(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY, expanded]);
  
  return (
    <main>
      <section
        className={`
          h-screen overflow-hidden flex top-0 left-0 w-full
          `}
      >
        <motion.div style={{ opacity: taglineOpacity }} className='w-full h-full flex items-center'>
        <div className="flex w-full justify-center items-center gap-[90px]">
          <h1 className="w-[40%] flex justify-end text-[86px] text-gray-default font-semibold">
            <strong>힙한</strong>&nbsp; 우리가
          </h1>
          <motion.div
            className="h-[360px] bg-transparent relative"
            initial={{ width: 0 }}
            animate={controls}
          >
            <div className='flex justify-center gap-[10px] absolute top-[-55px] w-full'>
              <Image src={heart} alt='히로섹션 아이콘1' width={30} height={30}/>
              <Image src={emoji} alt='히로섹션 아이콘2' width={30} height={30}/>
              <Image src={thunder} alt='히로섹션 아이콘3'width={30} height={30}/>              
            </div>
          </motion.div>
          <h1 className="w-[40%] text-[86px] text-gray-default font-semibold">
            <strong>칠</strong>하게 노는 법
          </h1>
        </div>
        <p className="absolute bottom-[60px] left-1/2 -translate-x-1/2 text-center text-[#878787] text-[23  px]">
          뻔하지 않은 우리,<br/> FUNFUN 하게 노는 방법 궁금하지 않아?
        </p>
      </motion.div>
        {OFFSETS.map(({ x, y }, i) => (
  <MotionImage
    key={i}
    src={hero1}
    alt={`card-${i}`}
    width={240}
    height={360}
    initial={{ x: 0, y: 0, opacity: 0 }}           
    animate={expanded
      ? { x, y, opacity: 1 }                       
      : { x: 0, y: 0, opacity: 1 }                  
    }
    transition={{
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: 0.2,                                  
      duration: 0.2,
    }}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  />
))}
      </section>

      {/* hero 부분 높이 값 가질려면 아래 section height 값 설정 해주세요 */}
      <section className="relative h-[100vh] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]">
      </section>
      <section className="relative h-fit bg-[#000]">
          <AdvantageTagLine/>
      </section>
      <section className="relative h-[200px] bg-gradient-to-b from-[rgba(0,0,0,1)] to-[#121212]">
      </section>
      <section className="relative h-screen bg-[#121212]">
        <SlovingWrapper>
          <ProblemSolving/>
          <ProblemSolving/>
          <ProblemSolving/>
        </SlovingWrapper>
      </section>
      <section className="relative h-fit bg-[#121212]">
        <AiRecommendation/>
      </section>
    </main>
  );
}