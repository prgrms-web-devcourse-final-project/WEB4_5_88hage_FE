'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
// import thinking from '@/assets/images/thinking.png';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signupStore';

export default function Signup() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [maleSelected, setMaleSelected] = useState(true);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [duplicationCheck, setDuplicationCheck] = useState(false);

  const [invalidNickname, setInvalidNickname] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);

  // const [newUser, setNewUser] = useState<NewUserData>();
  const { userData, setData } = useSignupStore();
  const router = useRouter();

  const nicknameCheck = /^[가-힣a-zA-Z0-9]{2,10}$/;
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

  const siguUpValidation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nickname.length === 0 ||
      !duplicationCheck ||
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
    ) {
      if (!duplicationCheck) alert('닉네임 중복 체크해주세요.');
      else alert('회원가입에 실패했습니다.');
    } else {
      setData({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        nickname: nickname,
        address: address,
        birthDate: birthDate,
        gender: maleSelected ? 'MALE' : 'FEMALE',
        isMarketingAgreed: checkedList.includes('marketing'),
      });
    }
  };

  useEffect(() => {
    if (userData) {
      axios
        .post('http://funfun.cloud/api/users/signup', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          console.log(data.data);
          router.push('/signup/email-check');
        })
        .catch((error) => {
          console.log(error.response.data);
          alert(error.response.data.message);
        });
    }
  }, [userData]);

  return (
    <form onSubmit={siguUpValidation} className="signup-bg">
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
              setDuplicationCheck(false);
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
            onClick={() => {
              if (!nicknameCheck.test(nickname)) {
                alert('닉네임이 올바른 형식이 아닙니다.');
              } else {
                axios
                  .post(
                    'http://funfun.cloud/api/users/verify/nickname',
                    { nickname: nickname },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )
                  .then((response) => {
                    console.log(response.data);
                    alert(response.data.data);
                    setDuplicationCheck(true);
                  })
                  .catch((error) => {
                    console.log(error.response.data);
                    alert(error.response.data.message);
                    setDuplicationCheck(false);
                  });
              }
            }}
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
            if (e.target.value.length > 0 && emailCheck.test(e.target.value))
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
            if (e.target.value.length > 0 && passwordCheck.test(e.target.value))
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
            if (e.target.value === password) setInvalidConfirmPassword(false);
          }}
          onBlur={() => {
            if (confirmPassword !== password) setInvalidConfirmPassword(true);
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
        <button className="signup-btn hidden md:block">다음</button>
      </div>
      <button className="signup-btn md:hidden">다음</button>
    </form>
  );
}
