'use client'
import { EllipsisVertical } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import CalendarSelectDate from '../common/CalendarSelectDate';
import Toast from '../common/Toast';
import { useRouter } from 'next/navigation';

type Props ={
  info:CalendarEvent,
  setSelectListData:Dispatch<SetStateAction<CalendarEventList>>,
  setCalendarData:Dispatch<SetStateAction<CalendarEventList>>
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CalendarCard({info,setSelectListData,setCalendarData}:Props){
  //카드 수정 박스
  const[showBox,setShowBox] = useState(false);
  //데이터피커 모달
  const[showModal,setShowModal] = useState(false);
  const router = useRouter()

  const timeFormatting = () => {
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
    if(!response.ok){
      Toast.error('삭제 실패')
      throw new Error('삭제 실패');
    } else {
      Toast.success('삭제 성공')
    }

    const data = await response.json();
    setSelectListData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
    setCalendarData((prev) => prev.filter(data => data.calendarId !== info.calendarId));
    console.log('삭제 성공 : ', data);
    } catch(error) {
      console.log('이벤트 삭제 실패: ', error)
    }
  }

  const redirectDetailPage = ()=>{
    if(info.type === "CONTENT"){
      router.push(`/event/${info.activityId}`);
    } else {
      router.push(`/gathering/${info.activityId}`);
    }
  }

  return (
    <>
    <div onClick={redirectDetailPage}  className="h-fit text-[14px] justify-between flex min-w-[310px] bg-gray-6 rounded-[5px] lg:min-w-[250px] lg:w-[250px] cursor-pointer">
      <div className='flex'>
        <div className={`w-[4px] min-h-auto rounded-tl-[5px] rounded-bl-[5px] ${info.type === "CONTENT" ?'bg-[#4BFF69]':'bg-[#FF8A4B]'}`}></div>
        <div className="pl-[15px] pt-[15px] pb-[15px] flex gap-[15px] text-gray-sub flex-col">
            <h3>{info.title}</h3>
            <p className='text-[#A19F9F]'>{info.address}</p>
            <p className='text-[#A19F9F]'>{timeFormatting()}</p>
        </div>
      </div>
      <div className='relative'>
        {info.type !== 'GROUP' &&       
        <button className='mt-[18px] mr-[8px]'>
          <EllipsisVertical size={18} onClick={(e) => {
        e.stopPropagation();  
        setShowBox((prev) => !prev);
      }} className='text-[#e4e4e4]'/>
        </button>
        }
        {showBox && <div className='w-[80px] flex flex-col bg-[#252525] border border-[rgba(192,192,192,.4)] rounded-[5px] text-[#fff] absolute z-5 left-[-65px]'>
          <button onClick={() => {
            setShowModal(true);
            setShowBox(false);
          }} className='w-full h-[44px] flex items-center justify-center hover:text-main'>수정</button>
          <button onClick={() => {
            deleteEvent(+info.calendarId)
            setShowBox(false);
          }} className='w-full h-[44px] flex items-center justify-center hover:text-main'>삭제</button>
        </div>
        }
      </div>
    </div>
    {showModal && <CalendarSelectDate info={info} setShow={setShowModal} setSelectListData={setSelectListData }setCalendarData={setCalendarData} show={showModal}/>}
    </>
  );
};