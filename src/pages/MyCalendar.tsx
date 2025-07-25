'use client'
import CalendarContainer from '@/components/calendar/CalendarContainer';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import { getMonthlyCalendar } from '@/lib/api/calendar';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';

export default function MyCalendar() {
  const date = new Date();
  
  //전체 일정 대한 이벤트
  const [calendarData,setCalendarData] = useState<CalendarData[]>([]);

  //클릭한 날의 이벤트
  const [selectListData,setSelectListData] = useState<CalendarData[]>([]);

  //사용자가 선택한 날짜
  const [selectDate,setSelectDate] = useState<SelectDate>({
    date: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
  });

  useEffect(()=>{
    const getMonthCalendarDate = async () => {
      try{
        const {data} = await getMonthlyCalendar(selectDate.year,selectDate.month);
        
        const temp = data.map(data => {
          const start = moment.tz(data.selectedDate, 'Asia/Seoul').toDate();
          const end = moment(start).add(1, 'hour').toDate();
          return {
          activityId:data.activityId.toString(),
          calendarId:data.calendarId.toString(),
          title: data.title,
          start,
          end,
          type: data.type,
        }
      });
      console.log(temp);
      setCalendarData(temp);
      }catch(error){
        console.log('캘린더 정보를 불러오는데 실패 했습니다.',error)
      }
    }
    getMonthCalendarDate();
  },[selectDate.month,selectDate.year]);

  return (
    <>
        <div className="bg-gray-7 flex min-w-[335px] flex-col w-full lg:min-w-[375px] lg:bg-transparent mb-[80px] lg:mb-0">
          <h2 className="pt-[15px] pb-[5px] pl-[10px] font-semibold text-[#fff] lg:mb-[20px] lg:pl-0 lg:text-[28px]">
            일정관리
          </h2>
          <div className="flex w-full flex-col lg:flex lg:flex-row lg:gap-[20px]">
            <CalendarSidebar selectDate={selectDate} selectListData={selectListData} setSelectListData={setSelectListData} setCalendarData={setCalendarData}/>
            <CalendarContainer setSelectDate={setSelectDate} setSelectListData={setSelectListData} calendarData={calendarData} />
          </div>
        </div>
    </>
  );
}
