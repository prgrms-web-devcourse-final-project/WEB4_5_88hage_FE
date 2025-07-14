import CalendarContainer from "@/components/calendar/CalendarContainer";
import CalendarSidebar from "@/components/calendar/CalendarSidebar";

export default function MyCalendar(){
  return (
    <>
    <div>
        <div className="mt-[90px] mb-[20px] font-semibold text-gray-default lg:text-[32px] lg:mt-[24px] lg:mb-[30px]">안녕하세요, 홍길동님</div>
        <div className="flex flex-col w-[335px] min-w-[335px] bg-gray-7 lg:bg-transparent lg:w-fit ">
          <h2 className="text-[#fff] pt-[15px] pb-[5px] pl-[10px] font-semibold lg:pl-0 lg:text-[28px] lg:mb-[35px]">일정관리</h2>
          <div className="lg:flex lg:gap-[20px] lg:flex-row flex flex-col w-full">
            <CalendarSidebar/>
            <CalendarContainer/>
          </div>
        </div>
    </div>
     </>
  );
};