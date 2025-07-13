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
    <div style={{ height: '80vh' }} className='flex justify-center items-center'>
      <Calendar
        localizer={localizer}
        // events={events}
        startAccessor="start"
        endAccessor="end"
        // style={{ height: '100%' }}
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