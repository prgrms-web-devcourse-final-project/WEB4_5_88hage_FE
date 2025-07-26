'use client'
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import SelectDate from '../common/SelectDate';

type Props ={
  info:CalendarData,
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
  setCalendarData:Dispatch<SetStateAction<CalendarData[]>>
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CalendarCard({info,setSelectListData,setCalendarData}:Props){
  const[show,setShow] = useState(false);
  console.log(info.calendarId)

  const timeFormatting = ()=> {
    const date = new Date(info.start)
    const houre = date.getHours();
    const minute = date.getMinutes();
    return `${houre}시 ${minute}분`
  }

  const deleteEvent = async (id:number)=>{
    try{
     const response = await fetch(`${baseUrl}/api/calendars/${Number(id)}`,{
        method: 'DELETE',
        credentials: 'include', 
        headers: {
          accept: 'application/json',
        },
    })
     const data = await response.json();
     setSelectListData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
     setCalendarData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
     console.log('삭제 성공 : ', data);
    } catch(error) {
      console.log('이벤트 삭제 실패: ', error)
    }
  }

  // const modifyEvent = async (id:number)=>{
  //   try{
  //    const response = await fetch(`${baseUrl}/api/calendars/${Number(id)}`,{
  //       method: 'PATCH',
  //       credentials: 'include', 
  //       headers: {
  //         accept: 'application/json',
  //       },
  //       body: {
  //          "selectedDate": "2025-07-25T20:17:41.152Z"
  //       }
  //   })
  //    const data = await response.json();
  //    setSelectListData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
  //    setCalendarData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
  //    console.log('수정 성공 : ', data);
  //   } catch(error) {
  //     console.log('이벤트 수정 실패: ', error)
  //   }
  // }

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
          <X size={16} onClick={()=> deleteEvent(info.calendarId)} className='text-[#e4e4e4]'/>
        </button>
      </div>
    </div>
    {show && <SelectDate title={info.title} id={info.calendarId} setShow={setShow} callbackFc={}/>}
    </>
  );
};