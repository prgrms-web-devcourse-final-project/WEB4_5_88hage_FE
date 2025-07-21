'use client'
// import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';
import '../../assets/styles/calendar/calendarCustom.css'
import { Dispatch, SetStateAction } from 'react';

moment.locale('ko');
const localizer = momentLocalizer(moment);
type Props = {selectDate:SelectDate,setSelectDate:Dispatch<SetStateAction<SelectDate>>}

export default function CalendarContainer({selectDate,setSelectDate}:Props){
  // const [events, setEvents] = useState(initialEvents);
  // const [today,setToday] = useState();
  return (
    <>
    <div className='w-[100%] lg:w-[calc(100%-300px)] h-fit'>
      <Calendar
        localizer={localizer}
        views={['month']}
        // events={dummyEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        //달력 cell 클릭
        onSelectSlot={(slotInfo:any) => {
          console.log(slotInfo);
          const newDate = slotInfo.start;
          setSelectDate(prevDate => {
            return {...prevDate,...newDate}
          })
          console.log(selectDate)
        }}
        selectable="ignoreEvents"
        // selectable={true} 
        // onSelectEvent={}
        //달력 월별 컨트롤러
        onNavigate={(date:Date) => {
          const newDate = {
            date: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear()
          }
          setSelectDate(prevDate => {
            return {...prevDate,...newDate}
          })
        }}
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