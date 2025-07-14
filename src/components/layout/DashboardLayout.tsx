import Greeting from '../common/Greeting';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {' '}
      {/* Main flex container */}
      <Sidebar /> {/* Fixed sidebar */}
      <div className="flex flex-1 flex-col lg:ml-[270px]">
        {' '}
        {/* Main content area, accounts for sidebar width */}
        <DashboardHeader /> {/* Fixed header */}
        <main className="flex-1 p-5 pt-[70px] lg:pt-5">
          {' '}
          {/* Main content, padding-top for header */}
          <Greeting />
          {children} {/* This will render the actual page content */}
        </main>
      </div>
    </div>
  );
}
