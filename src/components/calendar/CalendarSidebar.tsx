'use client'
import { Undo2 } from 'lucide-react';
import CalendarCard from "./CalendarCard";

export default function CalendarSidebar(){
  return (
    <>
    <div className="bg-gray-7 w-full min-w-[335px] p-[10px] min-h-auto lg:w-[280px] lg:flex lg:items-center lg:flex-col lg:rounded-[5px] lg:min-w-[280px]">
        <div className="h-[40px] border-y border-t-gray-4 border-b-gray-4 flex items-center mb-[20px] lg:min-w-[250px] lg:w-[250px] lg:h-[60px] lg:border-0 lg:border-b lg:border-b-gray-4 cursor-default justify-between">
            <h3 className="text-gray-sub">오늘 일정 <span className="text-main">N</span>개</h3>
            <Undo2 className='lg:hidden cursor-pointer text-[#fff] mr-[10px] text-[14px]'/>
        </div>
        <div>
          <CalendarCard/>
        </div>
    </div>
    </>
  );
};