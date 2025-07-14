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
      <Sidebar />
      <div className="flex flex-1 flex-col lg:ml-[220px]">
        <DashboardHeader />
        <main className="flex-1 p-5 pt-[70px] lg:pt-5">
          {/* Main content, padding-top for header */}
          <Greeting />
          {children} {/* This will render the actual page content */}
        </main>
      </div>
    </div>
  );
}
