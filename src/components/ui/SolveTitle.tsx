import Image, { StaticImageData } from "next/image";

type TotalType= {
    img:StaticImageData,
    altText:string,
    text:string,
    strongText:string
}

export default function SolveTitle(
    {img,altText,text,strongText}: TotalType
){
  return (
    <>
    <div className="w-[160px] min-w-[160px] lg:w-[279px] flex flex-col mb-[30px]">
        <div className="w-[40px] h-[40px] lg:w-[68px] lg:h-[68px] relative">
           <Image src={img} alt={altText} fill className="object-contain"/>
        </div>
        <p className="text-[36px] lg:text-[64px] w-full text-gray-default leading-[77px]">
            {text}
            <strong>
                {strongText}
            </strong>
        </p>
    </div>
    </>
  );
};