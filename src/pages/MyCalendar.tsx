import CalendarContainer from '@/components/calendar/CalendarContainer';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';

export default function MyCalendar() {
  return (
    <>
      <div className="mainColor-gradient">
        <div className="text-gray-default mt-[90px] mb-[20px] font-semibold lg:mt-[24px] lg:mb-[30px] lg:text-[32px]">
          안녕하세요, 홍길동님
        </div>
        <div className="bg-gray-7 flex w-[335px] min-w-[335px] flex-col lg:w-fit lg:bg-transparent">
          <h2 className="pt-[15px] pb-[5px] pl-[10px] font-semibold text-[#fff] lg:mb-[35px] lg:pl-0 lg:text-[28px]">
            일정관리
          </h2>
          <div className="flex w-full flex-col lg:flex lg:flex-row lg:gap-[20px]">
            <CalendarSidebar />
            <CalendarContainer />
          </div>
        </div>
      </div>
    </>
  );
}
