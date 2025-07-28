'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import hero1 from '@/assets/images/hero1.png';

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
  const { scrollY } = useScroll();     // 전체 페이지 스크롤 위치
  const [expanded, setExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {

      // setIsPinned(y < 1200);

      if (y > 200 && !expanded) {
        setExpanded(true);
      } else if (y <= 200 && expanded) {
        setExpanded(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY, expanded]);
  
  return (
    <div>
      {/* pinned 여부에 따라 fixed 또는 relative */}
      <section
        className={`
          ${isPinned ? 'fixed top-0 left-0 w-full' : 'relative'}
          h-screen overflow-hidden
          `}
      >
        {/* 이 안에 고정될 콘텐츠 */}
          {OFFSETS.map(({ x, y }, i) => (
            <MotionImage
              key={i}
              src={hero1}      // public/images/hero1.png 에 위치
              alt={`card-${i}`}
              width={220}
              height={340}
              initial={{ x: 0, y: 0 }}
              animate={expanded ? { x, y } : { x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            />
          ))}
      </section>

      {/* pinned 해제 이후부터 보일 다음 섹션 */}
      <section className="relative h-[250vh] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]">
      </section>
      {/* <section className="relative h-screen bg-[#000]">
      </section> */}
    </div>
  );
}