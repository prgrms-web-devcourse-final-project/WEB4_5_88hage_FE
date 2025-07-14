'use client'
export default function CalendarCard(){
  return (
    <>
    <div className="h-fit flex min-w-[310px] bg-gray-6 rounded-[5px] overflow-hidden lg:min-w-[250px] lg:w-[250px] cursor-pointer">
        <div className="w-[4px] min-h-auto bg-main"></div>
        <div className="pl-[15px] pt-[15px] pb-[15px] flex gap-[15px] text-gray-sub flex-col">
            <h3>일정 제목</h3>
            <p>일정 위치</p>
            <p>일정 날짜</p>
        </div>
    </div>
    </>
  );
};