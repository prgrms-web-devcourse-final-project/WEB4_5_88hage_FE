'use client';

import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/calendar/calendarCustom.css';
import '../../assets/styles/calendar/profileCalendar.css';

moment.locale('ko');
const localizer = momentLocalizer(moment);

export default function ProfileCalendar({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calenderGetDateInfo = (date: Date) => {
    console.log(
      'Calendar navigated to: ',
      moment(date).format('YYYY년 MM월 DD일'),
    );
    setCurrentDate(date);
    onDateSelect(date);
  };

  const cellClickGetDateInfo = (slotInfo: any) => {
    console.log(
      'Cell clicked from: ',
      moment(slotInfo.start).format('YYYY년 MM월 DD일 HH:mm'),
      'to: ',
      moment(slotInfo.end).format('YYYY년 MM월 DD일 HH:mm'),
    );
    onDateSelect(slotInfo.start);
  };
  return (
    <>
      <div className="h-[100%] w-[100%]">
        <Calendar
          localizer={localizer}
          views={['month']}
          defaultView="month"
          date={currentDate}
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
            next: '>',
            previous: '<',
            today: '=',
            month: '월',
            week: '주',
            day: '일',
          }}
        />
      </div>
    </>
  );
}
