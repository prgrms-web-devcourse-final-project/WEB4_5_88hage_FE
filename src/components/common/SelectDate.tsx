'use client';

import DatepickerComponent from '@/components/common/DatepickerComponent';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  title:string, 
  id:number, 
  setShow: Dispatch<SetStateAction<boolean>>,
  // callbackFc : (param :PramsType) => void
}

export default function SelectDate({title,id,setShow}:Props){
    const [eventDate,setEventDate] = useState('');

    const addCalendar = async (data: { activityId: number; selectedDate: string }) => {
    try {
    const response = await fetch('https://funfun.cloud/api/calendars', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // 서버 응답이 실패 상태일 경우 에러 throw
      const errorData = await response.json();
      throw new Error(`HTTP ${response.status}: ${errorData.message || '오류 발생'}`);
    }
    console.log('등록 성공')
  } catch (error) {
    console.error('일정 등록 실패:', error);
    throw error;
  }
};

  return (
    <>
    <section onClick={(e)=> {
      if (e.target !== e.currentTarget) return;
      setShow(false)}
      }  className="w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-md z-100">
        <div className="p-[10px] flex flex-col gap-[15px] w-fit h-fit bg-gray-6 max-w-[350px] rounded-[5px]">
            <h1 className="text-gray-default text-[14px] mb-[-10px]">{title}</h1>
            <DatepickerComponent
            sendDate={date => setEventDate(date.toISOString())}
            placeholder="날짜와 시간을 입력해 주세요."
            className="rounded-[5px] border border-[#313131] bg-[rgba(31,31,31,.3)]"
            />
            <button onClick={()=> addCalendar({ activityId: id, selectedDate: eventDate })}  className="w-[330px] h-[40px] rounded-[5px] text-[#fff] bg-[#3a3a3a] flex items-center justify-center">일정 등록</button>
        </div>
    </section>
    </>
  );
};