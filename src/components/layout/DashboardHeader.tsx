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
    <header className="fixed t-0 right-0 z-10 w-full min-w-[335px] lg:min-w-[1240px]">
    <nav className="w-full flex items-center justify-between px-[20px] pt-[10px] lg:pt-[24px]">
        <button className="lg:hidden" onClick={()=>{previousHistory()}}>
            <IoIosArrowBack fill="#ffffff" size={24}/>
        </button>
        <Logo className="relative w-[63px] h-[24px] lg:w-[117px] lg:h-[44px]"/>
        <button className="rounded-full lg:bg-[#414141] p-1" aria-label="사이드바 토글 버튼">
            <BiMenuAltLeft className="text-main -mr-2 h-8 w-8 lg:mr-0" />
        </button>
    </nav>
    </header>
    </>
  );
};