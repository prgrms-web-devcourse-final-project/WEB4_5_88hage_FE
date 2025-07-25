import Image from "next/image";
import icons  from '@/assets/images/hero-icons.png'
import card  from '@/assets/images/hero1.png'
export default function HeroCards(){
  return (
    <>
    <section className="w-full h-screen relative flex flex-col justify-center">
        <div className="flex justify-center items-center h-fit gap-[90px] text-[86px] text-gray-default mb-[50px]">
            <h1 className="w-[40%] flex justify-end"><strong>힙한</strong>&nbsp;우리가</h1>
            <div>
                <div className="flex justify-center mb-[20px]">
            <Image src={icons} alt="아이콘" width={122} height={33}/>
        </div>
                <Image src={card} alt="카드" width={250} height={380}/>
            </div>
            <h1 className="w-[40%]"><strong>칠</strong>하게 노는 법</h1>
        </div>
        <p className="flex justify-center text-center text-[#878787]">뻔하지 않은 우리,<br/> FUNFUN 하게 노는 방법 궁금하지 않아?</p>
    </section>
    </>
  );
};