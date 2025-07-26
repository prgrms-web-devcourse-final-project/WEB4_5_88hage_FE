'use client'
// import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/calendar/calendarCustom.css'
import { Dispatch, SetStateAction, useState } from 'react';

moment.locale('ko');
const localizer = momentLocalizer(moment);
type Props = {
  setSelectDate: Dispatch<SetStateAction<SelectDate>>,
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
  calendarData:CalendarData[],
}

export default function CalendarContainer({setSelectDate,setSelectListData,calendarData}:Props){

  const calenderGetDateInfo = (date:Date) => {
      const newDate = {
          date: date.getDate(),
          month: date.getMonth()+1,
          year: date.getFullYear()
      }
      setSelectDate(prevDate => {
          return {...prevDate,...newDate}
      });

      const selectDayEvents = calendarData.filter(data =>
          data.start.toDateString() === date.toDateString()
      );

      console.log(calendarData);
      console.log("해당 날짜의 이벤트:", selectDayEvents);
      setSelectListData(selectDayEvents);
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
        events={calendarData}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '100%' }}
        //달력 cell 클릭
        onSelectSlot={cellClickGetDateInfo}
        selectable={true}
        // onSelectEvent={}
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