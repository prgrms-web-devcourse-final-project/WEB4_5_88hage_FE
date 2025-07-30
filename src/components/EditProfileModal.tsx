import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import basicProfileImg from '@/assets/images/basicProfile.png';
import { ChevronLeft, Settings } from 'lucide-react';
import GrayButton from './button/GrayButton';
import { verifyNickname } from '../lib/api/user';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  currentIntroduction: string;
  currentImageUrl: string;
  onSave: (
    nickname: string,
    introduction: string,
    imageUrl: string,
    imageFile?: File,
  ) => void;
  onAccountDelete: () => void;
}

type VerifyNicknameResponse =
  | { code: '0000'; message: string; reason: null; data: string }
  | { code: '4000' | '4014'; message: string; reason: string | null; data: { nickname?: string } }
  | { code: string; message: string; reason?: string | null; data?: { nickname?: string | undefined; } };

export default function EditProfileModal({
  isOpen,
  onClose,
  currentNickname,
  currentIntroduction,
  currentImageUrl,
  onSave,
  onAccountDelete,
}: EditProfileModalProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState(currentNickname);
  const [introduction, setIntroduction] = useState(currentIntroduction);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [selectedImageFile, setSelectedImageFile] = useState<File | undefined>(undefined);
  const [nicknameValidationMessage, setNicknameValidationMessage] =
    useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNicknameValidated, setIsNicknameValidated] = useState(
    nickname === currentNickname,
  ); // 닉네임 유효성 검사 상태 추가
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleNicknameCheck = async () => {
    setNicknameValidationMessage(''); // Clear previous validation messages
    setErrorMessage(''); // Clear previous error messages
    setIsNicknameValidated(false); // 검사 시작 시 유효성 초기화
    if (!nickname) {
      setNicknameValidationMessage('닉네임을 입력해주세요.');
      return;
    }
    if (nickname === currentNickname) {
      setNicknameValidationMessage(
        '현재 닉네임과 동일합니다. 변경하려면 다른 닉네임을 입력하세요.',
      );
      setIsNicknameValidated(true); // 현재 닉네임과 동일하면 유효한 것으로 간주
      return;
    }
    try {
      const response = await verifyNickname(nickname) as VerifyNicknameResponse;
      console.log("리스폰스 확인", response);
      if (response.code === '4014') {
        setErrorMessage('이미 사용 중인 닉네임입니다.');
        setIsNicknameValidated(false);
      } else if (
        response.code === '4000' &&
        response.data &&
        response.data.nickname
      ) {
        setErrorMessage(response.data.nickname);
        setIsNicknameValidated(false);
      } else if (!response.reason) {
        if (typeof response.data === 'string') {
          setNicknameValidationMessage(response.data);
        }
        setIsNicknameValidated(true);
      } else {
        setNicknameValidationMessage('알 수 없는 응답입니다.');
        setIsNicknameValidated(false);
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message === '잘못된 요청입니다.') {
          setErrorMessage(
            '닉네임은 한글, 영문, 숫자만 사용할 수 있으며, 2자 이상 10자 이하로 입력해야 합니다.',
          );
        } else if (error.message === '이미 사용 중인 닉네임입니다.') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('중복 검사 중 오류가 발생했습니다.');
        }
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-gray-6 w-full max-w-md rounded-lg px-8 py-5 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-start justify-center">
          <button>
            <ChevronLeft className="absolute left-0" onClick={onClose} />
          </button>{' '}
          <h2 className="t3 mb-6 font-semibold">정보 수정</h2>
        </div>
        {/* Profile Image */}
        <div className="mt-2 mb-6 flex flex-col items-center">
          <div className="relative">
            <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={basicProfileImg}
                  alt="Default Profile"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <button
              className="bg-gray-4 border-gray-6 absolute top-0 right-0 rounded-full border-3 p-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Settings height={16} width={16} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {/* TODO: Implement actual image upload logic here */}
        </div>

        {/* Nickname */}
        <div className="mb-4">
          <label
            htmlFor="nickname"
            className="text-gray-3 mb-2 block text-sm font-medium"
          >
            닉네임
          </label>
          <div className="relative">
            <input
              type="text"
              id="nickname"
              className="bg-gray-4 t3 focus:border-main w-full rounded-md p-3 focus:outline-none"
              value={nickname}
              placeholder="닉네임은 8자 이내로 작성하세요!"
              onChange={(e) => {
                const newNickname = e.target.value;
                setNickname(newNickname);
                if (newNickname === currentNickname) {
                  setIsNicknameValidated(true); // 현재 닉네임과 동일하면 유효한 것으로 간주
                } else {
                  setIsNicknameValidated(false); // 다르면 유효성 초기화
                }
              }}
            />
            <button
              className="text-gray-1 hover:text-main absolute top-2.5 right-2"
              onClick={handleNicknameCheck}
            >
              중복 검사
            </button>
          </div>
          {nicknameValidationMessage && (
            <p className="text-main mt-2 text-sm">
              {nicknameValidationMessage}
            </p>
          )}
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        {/* Self-introduction */}
        <div className="mb-6">
          <label
            htmlFor="introduction"
            className="text-gray-3 mb-2 block text-sm font-medium"
          >
            자기소개
          </label>
          <textarea
            id="introduction"
            placeholder="나에 대한 간략한 소개를 써주세요!"
            rows={5}
            className="bg-gray-4 border-gray-6 focus:border-main w-full resize-none rounded-md border p-3 focus:outline-none"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          ></textarea>
        </div>

        <GrayButton
          onClick={() => onSave(nickname, introduction, imageUrl, selectedImageFile)}
          disabled={nickname !== currentNickname && !isNicknameValidated}
        >
          저장하기
        </GrayButton>
        <div className="border-gray-7 t4 mt-2 flex items-center justify-center pt-4">
          <button
            onClick={() => router.push('/login/password-change')}
            className="w-full hover:underline"
          >
            비밀번호 변경
          </button>
          <button onClick={onAccountDelete} className="w-full hover:underline">
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
