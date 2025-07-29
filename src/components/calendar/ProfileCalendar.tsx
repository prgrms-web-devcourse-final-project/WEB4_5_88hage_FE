'use client'

import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/calendar/calendarCustom.css'
import '../../assets/styles/calendar/profileCalendar.css'

moment.locale('ko');
const localizer = momentLocalizer(moment);

export default function ProfileCalendar(){

  const calenderGetDateInfo = (date:Date) => {
      console.log(date)
    }

  const cellClickGetDateInfo = (slotInfo:any) => {
          console.log(slotInfo);
        }
  return (
    <>
    <div className='w-[100%] h-[100%]'>
      <Calendar
        localizer={localizer}
        views={['month']}
        defaultView="month" 
        // events={calendarData}
        // startAccessor="start"
        // endAccessor="end"
        // titleAccessor="title"
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