'use client';
import Image from 'next/image';
import thinking from '@/assets/images/thinking.svg';
import tagspageImg from '@/assets/images/tagspageImg.png';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSignupStore } from '@/stores/signupStore';
import { toast } from 'react-toastify';

function Tag({
  type,
  children,
  category,
  selected,
}: {
  type: string;
  children: string;
  category: string;
  selected: (type: string, checked: boolean, category: string) => void;
}) {
  const [checked, setChecked] = useState(false);
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    selected(type, e.target.checked, category);
  };
  return (
    <>
      <input
        type="checkbox"
        name={`${category}-${type}`}
        id={`${category}-${type}`}
        checked={checked}
        className="hidden"
        onChange={checkHandler}
      />
      <label
        htmlFor={`${category}-${type}`}
        className={`cursor-default rounded-full px-4 py-2 select-none ${checked ? 'bg-[#1CEBB9] text-[#333333]' : 'bg-[#313131]'}`}
      >
        {children}
      </label>
    </>
  );
}

export default function SignupPreferences({ isOAuth }: { isOAuth?: boolean }) {
  const [newUserPreferences, setNewUserPreferences] = useState<
    { category: string; type: string }[]
  >([]);
  const router = useRouter();
  const { userData, clearAll } = useSignupStore();
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (userData && !isOAuth) {
      fetch(`${API}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          rememberMe: true,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          console.log(response);
          clearAll();
          localStorage.removeItem('signup-store');
        })
        .catch((error) => console.log(error.response.data));
    } else if (userData && isOAuth) {
      clearAll();
      localStorage.removeItem('signup-store');
    }
  }, [userData]);

  const tagSelectHandler = (
    type: string,
    checked: boolean,
    category: string,
  ) => {
    if (checked) {
      setNewUserPreferences((list) => [
        ...list,
        { category: category, type: type },
      ]);
    } else {
      setNewUserPreferences(
        newUserPreferences.filter(
          (item) => item.category !== category && item.type !== type,
        ),
      );
    }
  };

  const handlePreferences = async () => {
    const contents = newUserPreferences
      .filter((item) => item.category === 'content')
      .map((e) => e.type);
    const groups = newUserPreferences
      .filter((item) => item.category === 'group')
      .map((e) => e.type);
    const response = await fetch(`${API}/api/preferences`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentPreferences: contents,
        groupPreferences: groups,
      }),
    });
    const { code, message } = await response.json();
    if (code === '0000') router.push('/signup/complete');
    else toast.warn(message);
  };

  return (
    <div className="flex w-screen">
      <div className="hidden items-center justify-center lg:flex lg:w-1/2">
        <Image src={tagspageImg} alt="tagsPageImg" />
      </div>
      <div className="signup-bg w-full lg:w-1/2">
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
              <Tag selected={tagSelectHandler} category="group" type="ART">
                예술 🎨
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="TRAVEL">
                여행 🧭
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="FOOD">
                음식 🍔
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="GAME">
                게임 🎮
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="CULTURE">
                문화 🌍
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="SPORT">
                운동 👟
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="STUDY">
                자기 개발 📖
              </Tag>
              <Tag selected={tagSelectHandler} category="group" type="MOVIE">
                영화 🎬
              </Tag>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-medium text-[#dfdfdf]">행사 카테고리 🎈</div>
            <div className="flex flex-wrap gap-2.5">
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="THEATER"
              >
                연극 👏
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="DANCE">
                무용 💃
              </Tag>
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="POP_DANCE"
              >
                대중무용 🕺
              </Tag>
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="CLASSIC"
              >
                클래식 🎻
              </Tag>
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="POP_MUSIC"
              >
                대중음악 🎸
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="GUKAK">
                국악 🪘
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="MIX">
                복합 🎉
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="MAGIC">
                서커스/마술 🎪
              </Tag>
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="MUSICAL"
              >
                뮤지컬 🎤
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="TOUR">
                관광지 🏛️
              </Tag>
              <Tag
                selected={tagSelectHandler}
                category="content"
                type="CULTURE"
              >
                문화 시설 🗼
              </Tag>
              <Tag selected={tagSelectHandler} category="content" type="SPORTS">
                레포츠 🏌
              </Tag>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="signup-btn absolute bottom-[21px] lg:relative lg:mt-[59px]"
          onClick={handlePreferences}
        >
          완료
        </button>
      </div>
    </div>
  );
}
