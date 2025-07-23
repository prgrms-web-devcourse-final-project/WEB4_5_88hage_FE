'use client'
import CalendarContainer from '@/components/calendar/CalendarContainer';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import { getMonthlyCalendar } from '@/lib/api/calendar';
import { useEffect, useState } from 'react';

export default function MyCalendar() {
  const date = new Date();
  const [calendarData,setCalendarData] = useState<CalendarData[]>([]);

  const [selectListData,setSelectListData] = useState<CalendarData[]>([]);

  const [selectDate,setSelectDate] = useState<SelectDate>({
    date: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
  });

  useEffect(()=>{
    const getMonthCalendarDate = async () => {
      try{
        const {data}    = await getMonthlyCalendar(selectDate.year,selectDate.month);
        console.log(data)
        const temp = data.map(data => {
          const start = new Date(data.selectedDate);
          const end = new Date(start.getTime() + 60 * 60 * 1000)
          return {
          activityId:data.activityId.toString(),
          calendarId:data.calendarId.toString(),
          title: data.title,
          start,
          end,
          type: data.type
        }
      });
      console.log(temp);
      setCalendarData(temp);
      }catch(error){
        console.log('캘린더 정보를 불러오는데 실패 했습니다.',error)
      }
    }
    getMonthCalendarDate();

  },[selectDate]);

  return (
    <>
        <div className="bg-gray-7 flex min-w-[335px] flex-col w-full lg:min-w-[375px] lg:bg-transparent mb-[80px] lg:mb-0">
          <h2 className="pt-[15px] pb-[5px] pl-[10px] font-semibold text-[#fff] lg:mb-[20px] lg:pl-0 lg:text-[28px]">
            일정관리
          </h2>
          <div className="flex w-full flex-col lg:flex lg:flex-row lg:gap-[20px]">
            <CalendarSidebar selectDate={selectDate} selectListData={selectListData} setSelectListData={setSelectListData} />
            <CalendarContainer setSelectDate={setSelectDate} setSelectListData={setSelectListData} calendarData={calendarData}/>
          </div>
        </div>
    </>
  );
}
