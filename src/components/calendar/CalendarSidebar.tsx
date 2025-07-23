'use client'
import { Undo2 } from 'lucide-react';
import CalendarCard from "./CalendarCard";
import { Dispatch, SetStateAction } from 'react';
type Props = {
  selectDate:SelectDate,
  selectListData:CalendarData[],
  setSelectListData:Dispatch<SetStateAction<CalendarData[]>>,
}

export default function CalendarSidebar({selectDate,selectListData, setSelectListData}:Props){
  return (
    <>
    <div className="bg-gray-7 w-full min-w-[335px] p-[10px] min-h-auto lg:w-[280px] lg:flex lg:items-center lg:flex-col lg:rounded-[5px] lg:min-w-[280px]">
        <div className="h-[40px] border-y border-t-gray-4 border-b-gray-4 flex items-center mb-[20px] lg:min-w-[250px] lg:w-[250px] lg:h-[60px] lg:border-0 lg:border-b lg:border-b-gray-4 cursor-default justify-between">
            <h3 className="text-gray-sub">{String(selectDate.month)}월 {String(selectDate.date)}일 일정 <span className="text-main">{selectListData.length}</span>개</h3>
            <Undo2 className='lg:hidden cursor-pointer text-[#fff] mr-[10px] text-[14px]'/>
        </div>
        <ul>
          {selectListData.map((info:CalendarData) =>
          <li className='mb-[10px]' key={Number(info.deleteId)}>
            <CalendarCard info={info} setSelectListData={setSelectListData} selectListData={selectListData}/>
          </li>
          )}
        </ul>
    </div>
    </>
  );
};