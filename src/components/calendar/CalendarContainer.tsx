'use client'
// import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/calendar/calendarCustom.css'
import { Dispatch, SetStateAction} from 'react';

moment.locale('ko');
const localizer = momentLocalizer(moment);
type Props = {
  setSelectDate: Dispatch<SetStateAction<SelectDate>>,
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
  calendarData:CalendarData[],
}

export default function CalendarContainer({setSelectDate,setSelectListData,calendarData}:Props){

  const tempEvents = [
  {
    id: 0,
    title: '전체공휴일',
    allDay: true,
    start: new Date(2025, 6, 26),
    end:   new Date(2025, 6, 26),
    desc: '월요일 휴무',
  },
  {
    id: 1,
    title: '오전 스크럼',
    allDay: false,
    start: new Date(2025, 6, 27, 9, 30),
    end:   new Date(2025, 6, 27, 10, 0),
    desc: '팀 진행 상황 공유',
  },
  {
    id: 2,
    title: '점심 식사',
    allDay: false,
    start: new Date(2025, 6, 27, 12, 0),
    end:   new Date(2025, 6, 27, 13, 0),
  },
  {
    id: 3,
    title: '제품 리뷰 미팅',
    allDay: false,
    start: new Date(2025, 6, 28, 15, 0),
    end:   new Date(2025, 6, 28, 16, 30),
  },
  {
    id: 4,
    title: '제품 리뷰 미팅',
    allDay: false,
    start: new Date(2025, 6, 29, 15, 0),
    end:   new Date(2025, 6, 29, 16, 30),
  },
  {
    id: 5,
    title: '제품 리뷰 미팅',
    allDay: false,
    start: new Date(2025, 6, 30, 15, 0),
    end:   new Date(2025, 6, 30, 16, 30),
  },
  {
    id: 6,
    title: '제품 리뷰 미팅',
    allDay: false,
    start: new Date(2025, 6, 31, 15, 0),
    end:   new Date(2025, 6, 31, 16, 30),
  },
];

  const calenderGetDateInfo = (date:Date) => {
      const newDate = {
          date: date.getDate(),
          month: date.getMonth()+1,
          year: date.getFullYear()
      }
      //컨트롤러에 사용에 따른 월 변화 캐치
      setSelectDate(prevDate => {
          return {...prevDate,...newDate}
      });

      const getEventsList = calendarData.filter(data =>{
        return data.start.toDateString() === date.toDateString()}
      );

      console.log(calendarData);
      console.log("해당 날짜의 이벤트:", getEventsList);
      setSelectListData(getEventsList);
    }

  const cellClickGetDateInfo = (slotInfo:any) => {
          console.log(slotInfo);
          const newDate = slotInfo.start;
          setSelectDate(prevDate => {
            return {...prevDate,...newDate}
          });
        }

  return (
    <>
    <div className='w-[100%] lg:w-[calc(100%-300px)] h-fit'>
      <Calendar
        localizer={localizer}
        views={['month']}
        defaultView="month" 
        // events={calendarData}
        events={tempEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '900px' }}
        //달력 cell 클릭
        onSelectSlot={cellClickGetDateInfo}
        selectable={true}
        //컨트롤러 클릭
        onNavigate={calenderGetDateInfo}
        messages={{
          next: ">",
          previous: "<",
          today: "=",
          month: "월",
          week: "주",
          day: "일",
        }}
      />
    </div>
    </>
  );
};