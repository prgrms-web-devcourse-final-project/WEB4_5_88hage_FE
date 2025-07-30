/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { searchAddress } from '@/lib/utils/getAddressXYGeocode';
import React, { Dispatch, SetStateAction } from 'react';
import DaumPostcode from 'react-daum-postcode';

type setFc = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setLatitude: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<number>>;
};

export default function SearchAddressModal({
  setShowModal,
  setAddress,
  setLatitude,
  setLongitude,
}: setFc) {

  const themeObj = {
   bgColor: "#313131", //바탕 배경색
   searchBgColor: "#313131", //검색창 배경색
   contentBgColor: "#545454", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
   pageBgColor: "#888888", //페이지 배경색
   textColor: "#F2F2F2", //기본 글자색
   queryTextColor: "#D0D0D0", //검색창 글자색
   postcodeTextColor: "#1CEBB9", //우편번호 글자색
   outlineColor: "#D0D0D0" //테두리
};

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowModal((prev) => !prev);
  };

  //지번 선택시 data로 결과값이 넘어온다.
  const onCompletePost = async (data: any) => {
    console.log(data)
    const xyCoordinate = await searchAddress(data.address);

    if (xyCoordinate) {
      setLatitude(xyCoordinate.y);
      setLongitude(xyCoordinate.x);
    }

    setAddress(data.address);
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={(e) => closeModal(e)}
        className="absolute top-0 right-0 z-200 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-[20px]"
      >
        <div className="w-[400px] px-[20px]">
          <DaumPostcode onComplete={onCompletePost} theme={themeObj} />
        </div>
      </div>
    </>
  );
}
