'use client';
import SearchAddressModal from '@/components/auth/SearchAddressModal';

import { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/common/Checkbox';
import { useSignupStore } from '@/stores/signupStore';
import SignupPreferences from './SignupPreferences';
import Logo from '@/components/common/Logo';

export default function LoginOAuth() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { setData, setVerified } = useSignupStore();
  const [maleSelected, setMaleSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nick, setNick] = useState('');
  const [nickChecked, setNickChecked] = useState(false);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [birthDate, setBirthDate] = useState('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const nicknameCheck = /^[가-힣a-zA-Z0-9]{2,10}$/;

  const getUserInfo = async () => {
    const response = await fetch(`${API}/api/users/info`, {
      method: 'GET',
      credentials: 'include',
    });
    const { data } = await response.json();
    console.log(data);
    if (!!data.gender) {
      alert('이미 가입된 사용자입니다.');
      router.push('/');
    } else setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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

  const handleLoginOAuth2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickChecked) {
      alert('닉네임 중복 체크해주세요.');
    } else if (
      nicknameCheck.test(nick) &&
      address.length > 0 &&
      birthDate.length > 0 &&
      checkedList.includes('terms') &&
      checkedList.includes('privacy')
    ) {
      const response = await fetch(`${API}/api/users/oauth2/signup`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          address: address,
          birthDate: birthDate,
          gender: maleSelected ? 'MALE' : 'FEMALE',
          isMarketingAgreed: checkedList.includes('marketing'),
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4),
          nickname: nick,
        }),
      });
      const { code, message } = await response.json();
      if (code === '0000') {
        fetch(`${API}/api/users/info`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data.data);
            setVerified(true);
          })
          .finally(() => setPage(2));
      } else alert(message);
    }
  };

  return (
    <>
      {page === 1 && (
        <div className="flex flex-col items-center">
          {isLoading && <div className="text-white"></div>}
          {!isLoading && (
            <>
              <Logo className="absolute top-[26px] left-[40px] hidden lg:block"/>
              <form
                id="oAuthFormId"
                onSubmit={handleLoginOAuth2}
                className="flex h-screen w-full max-w-150 flex-col justify-center gap-5"
              >
                <div className="relative flex w-full items-center">
                  <Input
                    type="text"
                    placeholder="닉네임을 입력 해주세요."
                    className="rounded-[10px] px-4 py-4 lg:py-5"
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!nicknameCheck.test(nick)) {
                        alert('닉네임이 올바른 형식이 아닙니다.');
                      } else {
                        const response = await fetch(
                          `${API}/api/users/verify/nickname`,
                          {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nickname: nick }),
                          },
                        );
                        const { code, message, data } = await response.json();
                        if (code === '0000') {
                          alert(data);
                          setNickChecked(true);
                        } else alert(message);
                      }
                    }}
                    className="absolute right-4 cursor-pointer text-sm text-[#8d8d8d]"
                  >
                    중복 검사
                  </button>
                </div>
                <Input
                  type="text"
                  placeholder="주소를 작성해 주세요."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onClick={() => setShowModal((prev) => !prev)}
                  className="rounded-[10px] px-4 py-4 lg:py-5"
                />
                <Input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="생년 월일 8자리 ( YYYYMMDD )"
                  className="rounded-[10px] px-4 py-4 lg:py-5"
                />
                <div className="flex w-full gap-5">
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
                <div className="text-gray-3 mt-[26px] flex items-center justify-baseline gap-2 lg:mt-0">
                  <Checkbox
                    box
                    id="allAgree"
                    onChange={handleAllCheck}
                    checked={checkedList.length === 3}
                  >
                    모두 동의 (선택 포함)
                  </Checkbox>
                </div>
                <div className="text-gray-3 mb-[41px] flex flex-col gap-2 lg:mb-0">
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
                <button className="signup-btn">다음</button>
              </form>
              {showModal && (
                <SearchAddressModal
                  setShowModal={setShowModal}
                  setAddress={setAddress}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              )}
            </>
          )}
        </div>
      )}
      {page === 2 && <SignupPreferences isOAuth />}
    </>
  );
}
