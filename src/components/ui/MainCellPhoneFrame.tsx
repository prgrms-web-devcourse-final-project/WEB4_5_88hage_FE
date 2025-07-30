import Image, { StaticImageData } from "next/image";
import { Signal } from 'lucide-react';
import { Wifi } from 'lucide-react';
import { BatteryFull } from 'lucide-react';

export default function MainCellPhoneFrame(
  {img,altText}: {img:StaticImageData,altText:string}
){
    const date = new Date();
    const houre = date.getHours();
    const minute = date.getMinutes();

    function formatMinute(){
      if(minute < 10) return `0${minute}`
      return minute
    }

  return (
    <>
    <div className="min-w-[290px] min-h-[460px] w-[290px] h-[460px] p-[10px] rounded-[20px] border border-[#7F7F7F]">
        <div className=" text-gray-default flex justify-between items-center mb-[30px] text-gray-white ">
            <span>{`${houre}:${formatMinute()}`}</span>
            <div className='flex gap-[5px] w-fit'>
              <Signal size={18}/>
              <Wifi size={18}/>
              <BatteryFull size={18}/>
            </div>
        </div>
        <div className='w-full h-[370px] overflow-hidden'>
           <Image src={img} alt={altText} width={340} className="object-cover"></Image>
        </div>
    </div>
    </>
  );
};