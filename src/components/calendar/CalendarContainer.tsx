'use client'

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
        events={calendarData}
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