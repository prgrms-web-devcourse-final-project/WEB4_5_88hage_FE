'use client'

import DaumPostcode from "react-daum-postcode";

export default function SearchAddressModal(){
  return (
    <>
    <div className="w-[400px] px-[20px]">
       <DaumPostcode/>
    </div>
    </>
  );
};