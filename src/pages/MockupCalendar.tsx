import DashboardLayout from '@/components/layout/DashboardLayout';
import MyCalendar from '@/pages/MyCalendar';
// import Profile from '@/pages/Profile';

export default function page() {
  return (
    <>
    {/* 레이아웃 */}
    <DashboardLayout mainCss='px-[7%]'>
      <MyCalendar/>
    </DashboardLayout>
    </>
  );
}