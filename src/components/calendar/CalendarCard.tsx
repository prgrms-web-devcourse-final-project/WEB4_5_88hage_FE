'use client'
import { deleteCalendar } from '@/lib/api/calendar';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
type Props ={
  info:CalendarData,
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
}
export default function CalendarCard({info,setSelectListData}:Props){

  const timeFormatting = ()=> {
    const date = new Date(info.start)
    const houre = date.getHours();
    const minute = date.getMinutes();
    return `${houre}시 ${minute}분`
  }

  const deleteEvent = async ()=>{
    try{
     const response = await deleteCalendar(Number(info.deleteId));
     setSelectListData((prev) => prev.filter(data => data.deleteId !== info.deleteId));
     console.log(response);
     console.log(selectListData);
    } catch(error) {
      console.log('이벤트 삭제 실패: ', error)
    }
  }
  useEffect(() => {
  console.log("컴포넌트 렌더 시 전달된 selectListData:", selectListData);
  }, [selectListData]);

  const redirectDetailPage = ()=>{

  }

  return (
    <>
    <div className="h-fit text-[14px] justify-between flex min-w-[310px] bg-gray-6 rounded-[5px] overflow-hidden lg:min-w-[250px] lg:w-[250px] cursor-pointer">
      <div className='flex'>
        <div className="w-[4px] min-h-auto bg-main"></div>
        <div className="pl-[15px] pt-[15px] pb-[15px] flex gap-[15px] text-gray-sub flex-col">
            <h3>{info.title}</h3>
            <p>일정 위치</p>
            <p>{timeFormatting()}</p>
        </div>
      </div>
      <div>
        <button className='mt-[8px] mr-[8px]'>
          <X size={16} onClick={deleteEvent} className='text-[#e4e4e4]'/>
        </button>
      </div>
    </div>
    </>
  );
};