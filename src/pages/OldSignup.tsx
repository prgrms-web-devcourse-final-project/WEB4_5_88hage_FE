'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import thinking from '@/assets/images/thinking.png';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import { ChangeEvent, FormEvent, useState } from 'react';

type NewUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
};

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

export default function OldSignup() {
  const [nextPage, setNextPage] = useState(false);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [maleSelected, setMaleSelected] = useState(true);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const [invalidNickname, setInvalidNickname] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);

  const [newUser, setNewUser] = useState<NewUserData>();
  const [newUserPreferences, setNewUserPreferences] = useState<string[]>([]);

  const nicknameCheck = /^[가-힣|a-z|A-Z|0-9|]+$/;
  const emailCheck = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{8,20}$/;
  const birthDateCheck = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

  const handleCheckChange = (id: string) => {
    const isChecked = checkedList.includes(id);
    if (!isChecked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((el) => el !== id));
    }
  };

  const handleAllCheck = ({
    target: { checked },
  }: {
    target: { checked: boolean };
  }) => {
    if (checked) {
      setCheckedList(['terms', 'privacy', 'marketing']);
    } else setCheckedList([]);
  };

  const goNextPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nickname.length === 0 ||
      !nicknameCheck.test(nickname) ||
      email.length === 0 ||
      !emailCheck.test(email) ||
      password.length === 0 ||
      !passwordCheck.test(password) ||
      confirmPassword !== password ||
      address.length === 0 ||
      birthDate.length === 0 ||
      !birthDateCheck.test(birthDate) ||
      !checkedList.includes('terms') ||
      !checkedList.includes('privacy')
    )
      alert('error');
    else {
      setNewUser({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        nickname: nickname,
        address: address,
        birthDate: birthDate,
        gender: maleSelected ? 'MALE' : 'FEMALE',
        isMarketingAgreed: checkedList.includes('marketing'),
      });
      setNextPage(true);
    }
  };

  const tagSelectHandler = (type: string, checked: boolean) => {
    if (checked) {
      setNewUserPreferences((list) => [...list, type]);
    } else {
      setNewUserPreferences(newUserPreferences.filter((item) => item !== type));
    }
  };

  return (
    <div className="bg-[#232323]">
      {!nextPage && (
        <form
          onSubmit={goNextPage}
          className="flex min-h-screen w-full flex-col items-center justify-between gap-[30px] bg-[#232323] px-4 pt-6 pb-4 text-[#8d8d8d] md:ml-[50%] md:w-1/2 md:justify-center md:bg-[#262626]"
        >
          <Image
            src={logo}
            alt="logo"
            width={75}
            height={24}
            className="md:hidden"
          />
          <div className="flex w-full max-w-150 flex-col gap-[15px]">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="닉네임을 입력 해주세요."
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (
                    e.target.value.length > 0 &&
                    nicknameCheck.test(e.target.value)
                  )
                    setInvalidNickname(false);
                }}
                onBlur={() => {
                  if (nickname.length === 0 || !nicknameCheck.test(nickname))
                    setInvalidNickname(true);
                }}
              />
              <button
                type="button"
                className="absolute right-2 cursor-pointer text-sm"
                tabIndex={-1}
              >
                중복 검사
              </button>
            </div>
            {invalidNickname && (
              <div className="text-sm text-red-400">잘못된 닉네임입니다.</div>
            )}
            <Input
              type="text"
              placeholder="이메일을 입력 해주세요."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (
                  e.target.value.length > 0 &&
                  emailCheck.test(e.target.value)
                )
                  setInvalidEmail(false);
              }}
              onBlur={() => {
                if (email.length === 0 || !emailCheck.test(email))
                  setInvalidEmail(true);
              }}
            />
            {invalidEmail && (
              <div className="text-sm text-red-400">잘못된 이메일입니다.</div>
            )}
            <Input
              type="password"
              placeholder="비밀번호를 입력 해주세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (
                  e.target.value.length > 0 &&
                  passwordCheck.test(e.target.value)
                )
                  setInvalidPassword(false);
              }}
              onBlur={() => {
                if (password.length === 0 || !passwordCheck.test(password))
                  setInvalidPassword(true);
              }}
            />
            {invalidPassword && (
              <div className="text-sm text-red-400">
                잘못된 형식의 비밀번호입니다.
              </div>
            )}
            <Input
              type="password"
              placeholder="비밀번호를 확인 해주세요."
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value === password)
                  setInvalidConfirmPassword(false);
              }}
              onBlur={() => {
                if (confirmPassword !== password)
                  setInvalidConfirmPassword(true);
              }}
            />
            {invalidConfirmPassword && (
              <div className="text-sm text-red-400">
                비밀번호를 정확하게 입력 해주세요.
              </div>
            )}
            <Input
              type="text"
              placeholder="주소를 작성해 주세요."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (e.target.value.length > 0) setInvalidAddress(false);
              }}
              onBlur={() => {
                if (address.length === 0) setInvalidAddress(true);
              }}
            />
            {invalidAddress && (
              <div className="text-sm text-red-400">주소를 입력 해주세요.</div>
            )}
            <Input
              type="text"
              placeholder="생년 월일 8자리 ( YYYYMMDD )"
              className="mt-[9px]"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                if (
                  e.target.value.length > 0 &&
                  birthDateCheck.test(e.target.value)
                )
                  setInvalidBirthDate(false);
              }}
              onBlur={() => {
                if (birthDate.length === 0 || !birthDateCheck.test(birthDate))
                  setInvalidBirthDate(true);
              }}
            />
            {invalidBirthDate && (
              <div className="text-sm text-red-400">
                생년월일을 올바르게 입력 해주세요.
              </div>
            )}
            <div className="flex gap-3.5">
              <button
                className="w-full cursor-pointer rounded-md bg-[#313131] p-3 text-sm text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
                disabled={maleSelected}
                onClick={() => setMaleSelected(true)}
              >
                남성
              </button>
              <button
                className="w-full cursor-pointer rounded-md bg-[#313131] p-3 text-sm text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
                disabled={!maleSelected}
                onClick={() => setMaleSelected(false)}
              >
                여성
              </button>
            </div>
            <div className="h-2"></div>
            <div className="flex items-center gap-2">
              <Checkbox
                box
                id="allAgree"
                onChange={handleAllCheck}
                checked={checkedList.length === 3}
              >
                모두 동의 (선택 포함)
              </Checkbox>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  onChange={() => handleCheckChange('terms')}
                  checked={checkedList.includes('terms')}
                >
                  (필수) 이용 약관 [ 보기 ]
                </Checkbox>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="privacy"
                  onChange={() => handleCheckChange('privacy')}
                  checked={checkedList.includes('privacy')}
                >
                  (필수) 개인정보 취급방침 [ 보기 ]
                </Checkbox>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="marketing"
                  onChange={() => handleCheckChange('marketing')}
                  checked={checkedList.includes('marketing')}
                >
                  (선택) 마케팅 정보 수신 [ 보기 ]
                </Checkbox>
              </div>
            </div>
            <button className="mt-2 hidden w-full cursor-pointer rounded-[5px] bg-[#1CEBB9] py-5 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:block">
              다음
            </button>
          </div>
          <button className="w-full max-w-150 cursor-pointer rounded-[5px] bg-[#1CEBB9] p-3 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:hidden">
            다음
          </button>
        </form>
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
                <Tag selected={tagSelectHandler} type="drama">
                  연극 👏
                </Tag>
                <Tag selected={tagSelectHandler} type="dance">
                  무용 💃
                </Tag>
                <Tag selected={tagSelectHandler} type="popular_dance">
                  대중무용 🕺
                </Tag>
                <Tag selected={tagSelectHandler} type="classic">
                  클래식 🎻
                </Tag>
                <Tag selected={tagSelectHandler} type="korean_music">
                  국악 🪘
                </Tag>
                <Tag selected={tagSelectHandler} type="popular_music">
                  대중음악 🎸
                </Tag>
                <Tag selected={tagSelectHandler} type="composite">
                  복합 🎉
                </Tag>
                <Tag selected={tagSelectHandler} type="circus">
                  서커스/마술 🎪
                </Tag>
                <Tag selected={tagSelectHandler} type="musical">
                  뮤지컬 🎤
                </Tag>
                <Tag selected={tagSelectHandler} type="tourist_spot">
                  관광지 🏛️
                </Tag>
                <Tag selected={tagSelectHandler} type="cultural_venues">
                  문화 시설 🗼
                </Tag>
                <Tag selected={tagSelectHandler} type="leisure_sports">
                  레포츠 🏌
                </Tag>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full max-w-150 cursor-pointer rounded-[5px] bg-[#1CEBB9] p-3 text-2xl font-bold text-[#333333] disabled:bg-[#313131] disabled:text-[#c0c0c0] md:mt-5 md:py-5"
            onClick={() => {
              console.log(newUser, newUserPreferences);
            }} // 테스트용
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
}
