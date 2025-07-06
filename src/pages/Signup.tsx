'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import thinking from '@/assets/thinking.png';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import { useState } from 'react';

function Tag({ type, children }: { type: string; children: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`cursor-default rounded-full px-4 py-2 ${checked ? 'bg-[#1CEBB9] text-[#333333]' : 'bg-[#313131]'}`}
      onClick={() => {
        setChecked(!checked);
      }}
    >
      {children}
    </div>
  );
}

export default function Signup() {
  const [nextPage, setNextPage] = useState(false);
  const [maleSelected, setMaleSelected] = useState(true);

  return (
    <div className="bg-[#232323]">
      {!nextPage && (
        <div className="flex min-h-screen w-full flex-col items-center justify-between gap-[30px] bg-[#232323] px-4 pt-6 pb-4 text-[#8d8d8d] md:ml-[50%] md:w-1/2 md:justify-center md:bg-[#262626]">
          <Image
            src={logo}
            alt=""
            width={75}
            height={24}
            className="md:hidden"
          />
          <div className="flex w-full max-w-150 flex-col gap-[15px]">
            <div className="relative flex items-center">
              <Input type="text" placeholder="닉네임을 입력 해주세요." />
              <button className="absolute right-2 cursor-pointer text-sm">
                중복 검사
              </button>
            </div>
            <Input type="text" placeholder="이메일을 입력 해주세요." />
            <Input type="password" placeholder="비밀번호를 입력 해주세요." />
            <Input type="password" placeholder="비밀번호를 확인 해주세요." />
            <Input type="text" placeholder="주소를 작성해 주세요." />
            <Input
              type="text"
              placeholder="생년 월일 8자리 (YYYYMMDD)"
              className="mt-[9px]"
            />
            <div className="flex gap-3.5">
              <button
                className="w-full cursor-pointer rounded-md bg-[#313131] p-3 text-sm text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
                disabled={maleSelected}
                onClick={() => setMaleSelected(true)}
              >
                남자
              </button>
              <button
                className="w-full cursor-pointer rounded-md bg-[#313131] p-3 text-sm text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
                disabled={!maleSelected}
                onClick={() => setMaleSelected(false)}
              >
                여자
              </button>
            </div>
            <div className="h-2"></div>
            <div className="flex items-center gap-2">
              <Checkbox id="allAgree" box>
                모두 동의 (선택 포함)
              </Checkbox>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="terms">(필수) 이용 약관 [ 보기 ]</Checkbox>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="privacy">
                  (필수) 개인정보 취급방침 [ 보기 ]
                </Checkbox>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="marketing">
                  (선택) 마케팅 정보 수신 [ 보기 ]
                </Checkbox>
              </div>
            </div>
            <button
              type="button"
              className="mt-2 hidden w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] py-5 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:block"
              onClick={() => setNextPage(true)}
            >
              다음
            </button>
          </div>
          <button
            type="button"
            className="w-full max-w-150 cursor-pointer rounded-[5px] bg-[#1CEBB9] p-3 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:hidden"
            onClick={() => setNextPage(true)}
          >
            다음
          </button>
        </div>
      )}
      {nextPage && (
        <div className="flex h-screen w-full flex-col items-center justify-between gap-[30px] bg-[#232323] px-4 pt-6 pb-4 text-[#8d8d8d] md:ml-[50%] md:w-1/2 md:justify-center md:bg-[#262626]">
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
                <Tag type="art">예술 🎨</Tag>
                <Tag type="travel">여행 🧭</Tag>
                <Tag type="food">음식 🍔</Tag>
                <Tag type="game">게임 🎮</Tag>
                <Tag type="culture">문화 🌍</Tag>
                <Tag type="sports">운동 👟</Tag>
                <Tag type="development">자기 계발 📖</Tag>
                <Tag type="movie_group">영화 🎬</Tag>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-medium text-[#dfdfdf]">행사 카테고리 🎈</div>
              <div className="flex flex-wrap gap-2.5">
                <Tag type="classic">클래식 🎹</Tag>
                <Tag type="country_music">국악 🪘</Tag>
                <Tag type="movie_event">영화 🎞️</Tag>
                <Tag type="solo">독주/독창회 🎻</Tag>
                <Tag type="musical">연극/뮤지컬 👏</Tag>
                <Tag type="art">전시/미술 🖼️</Tag>
                <Tag type="education">교육/체험 👨‍🏫</Tag>
                <Tag type="dance">무용 💃</Tag>
                <Tag type="concert">콘서트 🎤</Tag>
                <Tag type="festival">축제 🎆</Tag>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full max-w-150 cursor-pointer rounded-[5px] bg-[#1CEBB9] p-3 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:mt-5 md:py-5"
            onClick={() => setNextPage(false)} // 테스트용
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
}
