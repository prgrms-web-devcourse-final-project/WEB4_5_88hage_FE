import { twMerge } from 'tailwind-merge';
import Greeting from '../common/Greeting';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
  mainCss,
}: {
  children: React.ReactNode;
  mainCss?: string;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:ml-[270px]">
        <DashboardHeader />
        <main
          className={twMerge(
            'mainColor-gradient flex-1 p-5 pt-[70px] lg:pt-5',
            mainCss,
          )}
        >
          {/* Main content, padding-top for header */}
          <Greeting />
          {children} {/* This will render the actual page content */}
        </main>
      </div>
    </div>
  );
}
