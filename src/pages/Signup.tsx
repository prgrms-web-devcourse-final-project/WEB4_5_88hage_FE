'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import { useState } from 'react';

function Tag({ children }: { children: string }) {
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
              <Checkbox id="allAgree">모두 동의 (선택 포함)</Checkbox>
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
              className="mt-2 hidden w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] p-2 font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:block"
              onClick={() => setNextPage(true)}
            >
              다음
            </button>
          </div>
          <button
            type="button"
            className="w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] p-2 font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:hidden"
            onClick={() => setNextPage(true)}
          >
            다음
          </button>
        </div>
      )}
      {nextPage && (
        <div className="flex min-h-screen w-full flex-col items-center justify-between gap-[30px] bg-[#232323] px-4 pt-6 pb-4 text-[#8d8d8d] md:ml-[50%] md:w-1/2 md:justify-center md:bg-[#262626]">
          <div></div>
          <div className="flex flex-col gap-5">
            <div>
              <div className="text-white">당신의 취향을 알려주세요</div>
              <div>더 정확한 추천을 위해 관심 있는 태그를 골라주세요.</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Tag>문화/예술</Tag>
              <Tag>운동/신체활동</Tag>
              <Tag>푸드/드링크</Tag>
              <Tag>지식/자기계발</Tag>
              <Tag>게임</Tag>
              <Tag>여행/나들이</Tag>
              <Tag>교육/체험</Tag>
              <Tag>클래식</Tag>
              <Tag>연극</Tag>
              <Tag>뮤지컬</Tag>
              <Tag>무용</Tag>
              <Tag>전시/미술</Tag>
              <Tag>국악</Tag>
              <Tag>영화</Tag>
              <Tag>축제</Tag>
              <Tag>콘서트</Tag>
              <Tag>독주/독창회</Tag>
            </div>
            <button
              type="button"
              className="hidden w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] p-2 font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:block"
            >
              완료
            </button>
          </div>
          <button
            type="button"
            className="w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] p-2 font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:hidden"
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
}
