'use client'
import { useRouter } from "next/navigation";
import Logo from "../common/Logo";
import { IoIosArrowBack } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";

export default function DashboardHeader(){
    const router = useRouter()
    const previousHistory = ()=>{
        router.back()
    }
  return (
    <>
    <header className="fixed t-0 right-0 z-10 w-full">
    <nav className="w-full flex items-center justify-between px-[20px] pt-[10px]">
        <button className="lg:hidden" onClick={()=>{previousHistory()}}>
            <IoIosArrowBack fill="#ffffff" size={24}/>
        </button>
        <Logo width={63} height={24}/>
        <button
             className="flex items-center justify-center"
            aria-label="사이드바 열기"
            >
            <BiMenuAltLeft className="text-main" size={24} />
        </button>
    </nav>
    </header>
    <div className="w-full h-[300px] bg-amber-500"></div>

    </>
  );
};