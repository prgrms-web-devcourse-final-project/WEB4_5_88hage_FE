'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import shiningStar from "@/assets/images/shining_star.png"
import balloon from "@/assets/images/balloon.png"
import target from "@/assets/images/target.png"
import good from "@/assets/images/good.png"

interface ShrinkBlockProps {
  children: React.ReactNode;
}

function ShrinkBlock({ children }: ShrinkBlockProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center center', 'center start'],
  });

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex h-[400px] justify-center items-center"
    >
      <motion.div
        style={{ scale, opacity }}
        className="flex justify-center items-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AdvantageTagLine() {
  return (
    <section
      className="
        text-[36px] lg:text-[80px] text-gray-default font-semibold
        flex flex-col items-center
        min-w-[335px] lg:min-w-[1580px]
        bg-[#000]
      "
    >
      {/* 첫 블록 */}
      <ShrinkBlock>
        <p className="flex items-center">
          취향에 딱 맞는 모임 추천{' '}
          <Image
            src={good}
            alt="엄지 올린 이미지"
            className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"
          />
        </p>
      </ShrinkBlock>

      {/* 두 번째 블록 */}
      <ShrinkBlock>
        <p className="flex flex-col justify-center items-center lg:flex-row">
          <span className="flex">
            <Image
              src={shiningStar}
              alt="별빛 이미지"
              className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"
            />
            바로 근처에,
          </span>
          <span className="flex">
            내 취향에 딱 맞는 컨텐츠
            <Image
              src={balloon}
              alt="풍선 이미지"
              className="w-[34px] h-[34px] lg:w-[78px] lg:h-[78px]"
            />
          </span>
        </p>
      </ShrinkBlock>

      {/* 세 번째 블록 */}
      <ShrinkBlock>
        <p className="flex items-center flex-col lg:flex-row">
          <span>
            <span className="gradient-text">AI 큐큐</span> 추천 취향 맞춤
          </span>
          <Image
            src={target}
            alt="과녁 이미지"
            className="w-[110px] h-[110px] lg:w-[184px] lg:h-[184px]"
          />
          <span>플레이스</span>
        </p>
      </ShrinkBlock>

      <div className="relative h-[20vh] w-full bg-gradient-to-b from-[rgba(0,0,0,1)] to-[#121212]">
      </div>
    </section>
  );
}