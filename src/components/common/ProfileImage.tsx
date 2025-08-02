'use client'
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type Props = {
    isLogin:boolean,
    src:string,
    className?:string
}

export default function ProfileImage({isLogin,src,className}:Props){
  return (
    <>
    <div className={twMerge('w-[100px] h-[100px] rounded-[50%] overflow-hidden', className)}>
        {isLogin ?<Image alt="프로필 이미지" width={100} height={100} src={src} className="w-full h-full"/> : <FaCircleUser className="w-full h-full text-[#575757]" />
         } 
    </div>
    </>
  );
};