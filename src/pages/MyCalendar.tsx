'use client';

import CalendarContainer from '@/components/calendar/CalendarContainer';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import { getMonthlyCalendar } from '@/lib/api/calendar';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import Spinner from '@/components/common/Spinner';

export default function MyCalendar() {
  const date = new Date();
  const [loading, setLoading] = useState(true);

  //사용자 전체 일정 대한 이벤트 리스트
  const [calendarData, setCalendarData] = useState<CalendarEventList>([]);

  //사이드 바에 나올 클릭한 날의 이벤트 리스트
  const [selectListData, setSelectListData] = useState<CalendarEventList>([]);

  //사용자가 클릭해서 선택한 날짜
  const [selectDate, setSelectDate] = useState<SelectDate>({
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad) {
      setLoading(true);
    }

    setLoading(true);
    //년, 월이 변경 되면 매달 받아올 데이터를 패칭
    const getMonthCalendarDate = async (year: number, month: number) => {
      try {
        const { data } = (await getMonthlyCalendar(
          year,
          month,
        )) as CalendarResponse;

        console.log('월 데이터 넘어오기 성공!', data);

        const temp: CalendarEventList = data.map((data) => {
          const start = moment.tz(data.selectedDate, 'Asia/Seoul').toDate();
          const end = moment(start).add(1, 'hour').toDate();
          return {
            activityId: data.activityId.toString(),
            calendarId: data.calendarId.toString(),
            address: data.address,
            title: data.title,
            start,
            end,
            type: data.type,
          };
        });

        setCalendarData(temp);

        const todayEvents = temp.filter(
          (event) => event.start.getDate() === selectDate.date,
        );

        setSelectListData(todayEvents);
      } catch (error) {
        console.log('캘린더 정보를 불러오는데 실패 했습니다.', error);
      } finally {
        setLoading(false);
        isFirstLoad.current = false;
      }
    };

    getMonthCalendarDate(+selectDate.year, +selectDate.month);
  }, [selectDate.month, selectDate.year, selectDate.date]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="bg-gray-7 mb-[80px] flex w-full min-w-[335px] flex-col lg:mb-0 lg:h-[calc(100vh-170px)] lg:max-h-[calc(100vh-170px)] lg:min-h-[calc(100vh-170px)] lg:min-w-[375px] lg:bg-transparent lg:w-full">
        <h2 className="pt-[15px] pb-[5px] pl-[10px] font-semibold text-[#fff] lg:mb-[35px] lg:pl-0 lg:text-[28px]">
          일정관리
        </h2>
        <div className="flex max-h-[calc(100%-60px)] w-full flex-col lg:flex lg:flex-row lg:gap-[20px]">
          <CalendarSidebar
            selectDate={selectDate}
            selectListData={selectListData}
            setSelectListData={setSelectListData}
            setCalendarData={setCalendarData}
          />
          <CalendarContainer
            setSelectDate={setSelectDate}
            setSelectListData={setSelectListData}
            calendarData={calendarData}
          />
        </div>
      </div>
    </>
  );
}
