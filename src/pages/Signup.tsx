'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import signupImg from '@/assets/images/signUpImg.png';
// import thinking from '@/assets/images/thinking.png';
import Input from '@/components/common/Input';
import Checkbox from '@/components/common/Checkbox';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/stores/signupStore';
import SearchAddressModal from '@/components/auth/SearchAddressModal';

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
  const [showModal,setShowModal] = useState(false);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);

  const [requiredAlert, setRequiredAlert] = useState(false);
  const { userData, setData } = useSignupStore((state) => state);
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
      latitude === 0 ||
      longitude === 0 ||
      birthDate.length === 0 ||
      !birthDateCheck.test(birthDate) ||
      !checkedList.includes('terms') ||
      !checkedList.includes('privacy')
    ) {
      setRequiredAlert(true);
    } else {
      setRequiredAlert(false);
      const newUserData: SignupUserData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        nickname: nickname,
        address: address,
        latitude : latitude,
        longitude:longitude,
        birthDate: birthDate,
        gender: maleSelected ? 'MALE' : 'FEMALE',
        isMarketingAgreed: checkedList.includes('marketing'),
      };
      setData(newUserData);
    }
  };

  useEffect(() => {
    if (userData) {
      axios
        .post('https://funfun.cloud/api/users/signup', userData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          router.push('/signup/verify');
        })
        .catch((error) => {
          console.log(error.response.data);
          alert(error.response.data.message);
        });
    }
  }, [userData]);

  return (
    <div className="flex">
      <Image
        src={logo}
        alt="logo"
        width={100}
        loading="lazy"
        className="absolute top-[26px] left-[40px] hidden lg:block"
      />
      <div className="hidden h-screen w-1/2 items-center justify-center lg:flex">
        <Image src={signupImg} alt="signupImg" />
      </div>
      <form onSubmit={siguUpValidation} className="signup-bg">
        <Image
          src={logo}
          alt="logo"
          width={75}
          height={24}
          className="mb-[31px] lg:hidden"
        />
        <div className="flex w-full max-w-150 flex-col gap-[15px] lg:gap-6">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="닉네임을 입력 해주세요."
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setDuplicationCheck(false);
              }}
              className="rounded-[10px] px-4 py-4 lg:py-5"
            />
            <button
              type="button"
              className="absolute right-4 cursor-pointer text-sm"
              tabIndex={-1}
              onClick={() => {
                if (!nicknameCheck.test(nickname)) {
                  alert('닉네임이 올바른 형식이 아닙니다.');
                } else {
                  axios
                    .post(
                      'https://funfun.cloud/api/users/verify/nickname',
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
          <Input
            type="text"
            placeholder="이메일을 입력 해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[10px] px-4 py-4 lg:py-5"
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력 해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[10px] px-4 py-4 lg:py-5"
          />
          <Input
            type="password"
            placeholder="비밀번호를 확인 해주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-[10px] px-4 py-4 lg:py-5"
          />
          <Input
            type="text"
            placeholder="주소를 작성해 주세요."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onClick={()=> setShowModal((prev) => !prev)}
            className="rounded-[10px] px-4 py-4 lg:py-5"
          />
          <Input
            type="text"
            placeholder="생년 월일 8자리 ( YYYYMMDD )"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="rounded-[10px] px-4 py-4 lg:py-5"
          />
          <div className="flex gap-5">
            <button
              className="w-full cursor-pointer rounded-md bg-[#313131] p-4.5 text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
              disabled={maleSelected}
              onClick={() => setMaleSelected(true)}
            >
              남성
            </button>
            <button
              className="w-full cursor-pointer rounded-md bg-[#313131] p-4.5 text-[#8d8d8d] disabled:cursor-default disabled:bg-[#1CEBB9] disabled:text-[#333333]"
              disabled={!maleSelected}
              onClick={() => setMaleSelected(false)}
            >
              여성
            </button>
          </div>
          <div className="mt-[26px] flex items-center gap-2 lg:mt-0">
            <Checkbox
              box
              id="allAgree"
              onChange={handleAllCheck}
              checked={checkedList.length === 3}
            >
              모두 동의 (선택 포함)
            </Checkbox>
          </div>
          <div className="mb-[41px] flex flex-col gap-2 lg:mb-0">
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
          <button className="signup-btn hidden lg:block">다음</button>
        </div>
        <button className="signup-btn lg:hidden">다음</button>
        <div className="mt-1 min-h-5 text-sm text-red-400">
          {requiredAlert && '필수 항목을 확인해주세요.'}
        </div>
      </form>
      {showModal && <SearchAddressModal setShowModal={setShowModal}  setAddress={setAddress} setLatitude={setLatitude}  setLongitude={setLongitude}/>}
    </div>
  );
}