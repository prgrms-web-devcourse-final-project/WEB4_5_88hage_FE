'use client'

import { searchAddress } from "@/lib/utils/getAddressXYGeocode";
import React, { Dispatch,SetStateAction } from "react";
import DaumPostcode from "react-daum-postcode";

type setFc = {
    setShowModal:Dispatch<SetStateAction<boolean>>,
    setAddress:Dispatch<SetStateAction<string>>,
    setLatitude: Dispatch<SetStateAction<number>>,
    setLongitude: Dispatch<SetStateAction<number>>,
}

export default function SearchAddressModal({ setShowModal, setAddress,setLatitude,setLongitude}:setFc){

    const closeModal = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()
        setShowModal((prev)=> !prev);
    }

    //지번 선택시 data로 결과값이 넘어온다.
    const onCompletePost = async (data: any) => {
    const xyCoordinate = await searchAddress(data.address)

    if(xyCoordinate){
      setLatitude(xyCoordinate.x);
      setLongitude(xyCoordinate.y);
    }

    setAddress(data.address)
    setShowModal((prev)=> !prev);
  };

  return (
    <>
    <div onClick={(e) => closeModal(e)}  className="absolute z-200 right-0 top-0 w-full h-screen flex justify-center items-center backdrop-blur-[20px] bg-[rgba(0,0,0,0.6)]">
      <div className="w-[400px] px-[20px]">
       <DaumPostcode onComplete={onCompletePost}/>
      </div>
    </div>
    </>
  );
};