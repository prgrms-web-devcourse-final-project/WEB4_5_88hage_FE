import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import { useRouter } from "next/navigation";

export default function Logo({className}:{className?:string}){
    const router = useRouter();
    const goHome = ()=>{
        router.push('/')
    }
  return (
    <>
    <button className={className} onClick={()=> goHome()}>
        <Image src={logo} alt="logo" fill />
    </button>
    </>
  );
};