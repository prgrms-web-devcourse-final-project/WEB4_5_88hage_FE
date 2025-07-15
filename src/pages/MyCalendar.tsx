import CalendarContainer from '@/components/calendar/CalendarContainer';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';

export default function MyCalendar() {
  return (
    <>
        <div className="bg-gray-7 flex min-w-[335px] flex-col w-full lg:min-w-[375px] lg:bg-transparent mb-[80px] lg:mb-0">
          <h2 className="pt-[15px] pb-[5px] pl-[10px] font-semibold text-[#fff] lg:mb-[35px] lg:pl-0 lg:text-[28px]">
            일정관리
          </h2>
          <div className="flex w-full flex-col lg:flex lg:flex-row lg:gap-[20px]">
            <CalendarSidebar />
            <CalendarContainer />
          </div>
        </div>
    </>
  );
}
