'use client'
// import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';
import '../../assets/styles/calendar/calendarCustom.css'

moment.locale('ko');
const localizer = momentLocalizer(moment);

export default function CalendarContainer(){
    // const [events, setEvents] = useState(initialEvents);

  return (
    <>
    <div className='w-[100%] lg:w-[calc(100%-300px)] h-fit'>
      <Calendar
        localizer={localizer}
        views={['month']}
        // events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        // onSelectEvent={}
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