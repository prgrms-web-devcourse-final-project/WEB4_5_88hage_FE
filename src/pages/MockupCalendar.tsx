import DashboardHeader from '@/components/layout/DashboardHeader';
import Sidebar from '@/components/layout/Sidebar';
import MyCalendar from '@/pages/MyCalendar';
// import Profile from '@/pages/Profile';

export default function page() {
  return (
    <>
    {/* 레이아웃 */}
    <DashboardHeader/>
    <Sidebar/>
    {/* 레이아웃 */}
    <div className='flex flex-row'>
      <div className='w-0 h-0 lg:w-[15%] lg:h-full lg:min-w-[270px]'>
      </div>
      <div className='flex justify-center lg:w-[85%] px-[20px] mb-[100px]'>
        <MyCalendar/>
      </div>
    </div>
    </>
  );
}