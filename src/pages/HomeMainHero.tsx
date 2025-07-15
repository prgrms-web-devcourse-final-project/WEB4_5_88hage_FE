import Image from "next/image";
import Group662 from "@/assets/images/Group662.svg";
import Bul from "@/assets/images/불.svg";
import Hipmoji from "@/assets/images/힙모지.svg";
import Thunder from "@/assets/images/thunder.svg";
import Heart from "@/assets/images/하트.svg";

export default function HomeMainHero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#121212] w-full">
      <div className="flex items-center justify-center w-full max-w-[1920px] mx-auto gap-10">
        <div className="flex items-center gap-2 whitespace-nowrap text-[48px] font-bold leading-none">
          <div className="relative inline-block">
            <Image
              src={Bul}
              alt="불"
              width={45}
              height={45}
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[110%] w-[45px] h-[45px]"
            />
            <span className="text-[#1CEBB9]">HIP</span>
          </div>
          <span className="text-white font-semibold">하고</span>
          <div className="relative inline-block">
            <Image
              src={Hipmoji}
              alt="힙모지"
              width={30}
              height={30}
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[110%] w-[30px] h-[30px]"
            />
            <span className="text-[#1CEBB9]">CHILL</span>
          </div>
          <span className="text-white font-semibold">한 우리</span>
        </div>
        <div className="relative w-[440px] h-[440px] flex-shrink-0 self-center">
          <div className="absolute inset-0 rounded-full bg-[#20272a] opacity-80" />
          <Image
            src={Group662}
            alt="메인 캐릭터"
            fill
            className="object-contain z-10"
            draggable={false}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="mt-[-70px] flex items-baseline gap-2 whitespace-nowrap text-[48px] font-bold leading-none">
            <span className="text-white font-semibold">놀고 싶은 애들은 모여!</span>
            <Image
              src={Thunder}
              alt="번개"
              width={89}
              height={108}
              className="inline-block align-middle w-[89px] h-[108px]"
            />
          </div>
          

        </div>
        
      </div>
      <button
    className="
      self-end
      mt-[-180px]
      mr-[150px]
      flex items-center justify-center
      w-[170px] h-[50px]
      bg-[#1CEBB9] rounded-full
      text-[24px] font-semibold text-white
      shadow-lg
    "
  >
    <span>놀러 가기</span>
    <Image
      src={Heart}
      alt="하트"
      width={30}
      height={30}
      draggable={false}
    />
  </button>
    </section>
  );
}