'use client';

import DatepickerComponent from '@/components/common/DatepickerComponent';
import moment from 'moment';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  info:CalendarData,
  setShow: Dispatch<SetStateAction<boolean>>,
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
  setCalendarData:Dispatch<SetStateAction<CalendarData[]>>
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CalendarSelectDate({
    info,
    setShow,
    setSelectListData,
    setCalendarData
    }:Props){
    
    const [eventDate,setEventDate] = useState('');

    const modifyEvent = async (id:number,eventDate:string)=>{
    try{
     const response = await fetch(`${baseUrl}/api/calendars/${Number(id)}`,{
        method: 'PATCH',
        credentials: 'include', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedDate: eventDate
        }),
    });

    const start = moment.tz(eventDate, 'Asia/Seoul').toDate();
    const end = moment(start).add(1, 'hour').toDate();
    
    setSelectListData(prev => prev.map(event =>
    event.calendarId === info.calendarId.toString()
        ? { ...event, start, end }     
        : event                         
    ));

    setCalendarData(prev => prev.map(event =>
    event.calendarId === info.calendarId.toString()
        ? { ...event, start, end }     
        : event           
    ));

    const data = await response.json();
    console.log('수정 성공 : ', data);
    } catch(error) {
      console.log('이벤트 수정 실패: ', error)
    }
    }

  return (
    <>
    <section onClick={(e)=> {
      if (e.target !== e.currentTarget) return;
      setShow(false)}
      }  className="w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-md z-100">
        <div className="p-[10px] flex flex-col gap-[15px] w-fit h-fit bg-gray-6 max-w-[350px] rounded-[5px]">
            <h1 className="text-gray-default text-[14px] mb-[-10px]">{info.title}</h1>
            <DatepickerComponent
            sendDate={date => setEventDate(date.toISOString())}
            placeholder="날짜와 시간을 선택해 주세요."
            className="rounded-[5px] border border-[#313131] bg-[rgba(31,31,31,.3)]"
            />
            <button onClick={() => {
              modifyEvent(info.calendarId, eventDate);
              setShow(false);
            }}  className="w-[330px] h-[40px] rounded-[5px] text-[#fff] bg-[#3a3a3a] flex items-center justify-center">일정 수정</button>
        </div>
    </section>
    </>
  );
};