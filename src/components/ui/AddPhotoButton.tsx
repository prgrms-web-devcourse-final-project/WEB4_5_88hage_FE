import { FaCamera } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function AddPhotoButton({className}:{className?:string}){
  return (
    <>
    <div className={twMerge("lg:mt-[-20px] lg:mb-[-5px]", className)}>
        <h3 className="text-main font-semibold mb-[13px] text-[16px] lg:text-[24px]">사진</h3>
        <button className="w-[50px] h-[50px] rounded-[5px] border border-[#343434] flex justify-center items-center lg:w-[80px] lg:h-[80px]">
            <FaCamera color="#343434" size={35} />;
        </button>
    </div>
    </>
  );
};