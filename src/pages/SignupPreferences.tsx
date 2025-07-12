'use client';
import Image from 'next/image';
import thinking from '@/assets/images/thinking.png';
import { ChangeEvent, useState } from 'react';

function Tag({
  type,
  children,
  selected,
}: {
  type: string;
  children: string;
  selected: (type: string, checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    selected(type, e.target.checked);
  };
  return (
    <>
      <input
        type="checkbox"
        name={type}
        id={type}
        checked={checked}
        className="hidden"
        onChange={checkHandler}
      />
      <label
        htmlFor={type}
        className={`cursor-default rounded-full px-4 py-2 select-none ${checked ? 'bg-[#1CEBB9] text-[#333333]' : 'bg-[#313131]'}`}
      >
        {children}
      </label>
    </>
  );
}

export default function SignupPreferences() {
  const [newUserPreferences, setNewUserPreferences] = useState<string[]>([]);

  const tagSelectHandler = (type: string, checked: boolean) => {
    if (checked) {
      setNewUserPreferences((list) => [...list, type]);
    } else {
      setNewUserPreferences(newUserPreferences.filter((item) => item !== type));
    }
  };
  return (
    <div className="signup-bg">
      <div></div>
      <div className="flex max-w-150 flex-col gap-10">
        <div className="flex flex-col gap-1">
          <Image
            src={thinking}
            alt=""
            width={32}
            height={32}
            quality={100}
            className="mb-1"
          />
          <div className="text-2xl font-semibold text-white">
            당신의 취향을 알려주세요
          </div>
          <div className="">딱 맞는 컨텐츠를 보여 드립니다</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-medium text-[#dfdfdf]">모임 카테고리 ❤️</div>
          <div className="flex flex-wrap gap-2.5">
            <Tag selected={tagSelectHandler} type="art">
              예술 🎨
            </Tag>
            <Tag selected={tagSelectHandler} type="travel">
              여행 🧭
            </Tag>
            <Tag selected={tagSelectHandler} type="food">
              음식 🍔
            </Tag>
            <Tag selected={tagSelectHandler} type="game">
              게임 🎮
            </Tag>
            <Tag selected={tagSelectHandler} type="culture">
              문화 🌍
            </Tag>
            <Tag selected={tagSelectHandler} type="sports">
              운동 👟
            </Tag>
            <Tag selected={tagSelectHandler} type="development">
              자기 개발 📖
            </Tag>
            <Tag selected={tagSelectHandler} type="movie">
              영화 🎬
            </Tag>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-medium text-[#dfdfdf]">행사 카테고리 🎈</div>
          <div className="flex flex-wrap gap-2.5">
            <Tag selected={tagSelectHandler} type="theater">
              연극 👏
            </Tag>
            <Tag selected={tagSelectHandler} type="dance">
              무용 💃
            </Tag>
            <Tag selected={tagSelectHandler} type="pop_dance">
              대중무용 🕺
            </Tag>
            <Tag selected={tagSelectHandler} type="classic">
              클래식 🎻
            </Tag>
            <Tag selected={tagSelectHandler} type="pop_music">
              대중음악 🎸
            </Tag>
            <Tag selected={tagSelectHandler} type="gukak">
              국악 🪘
            </Tag>
            <Tag selected={tagSelectHandler} type="mix">
              복합 🎉
            </Tag>
            <Tag selected={tagSelectHandler} type="magic">
              서커스/마술 🎪
            </Tag>
            <Tag selected={tagSelectHandler} type="musical">
              뮤지컬 🎤
            </Tag>
            <Tag selected={tagSelectHandler} type="tour">
              관광지 🏛️
            </Tag>
            <Tag selected={tagSelectHandler} type="cultural_facilities">
              문화 시설 🗼
            </Tag>
            <Tag selected={tagSelectHandler} type="sports">
              레포츠 🏌
            </Tag>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="signup-btn"
        onClick={() => {
          console.log(newUserPreferences);
        }} // 테스트용
      >
        완료
      </button>
    </div>
  );
}
