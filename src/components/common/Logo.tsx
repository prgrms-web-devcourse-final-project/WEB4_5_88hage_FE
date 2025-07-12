import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import { useRouter } from "next/navigation";

export default function Logo({width,height}:{width:number,height:number}){
    const router = useRouter();
    const goHome = ()=>{
        router.push('/')
    }
  return (
    <>
    <button className="w-fit h-fit" onClick={()=> goHome()}>
        <Image src={logo} alt="logo" width={width} height={height} />
    </button>
    </>
  );
};