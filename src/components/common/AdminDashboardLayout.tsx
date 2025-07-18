import { twMerge } from 'tailwind-merge';
import Greeting from '../common/Greeting';


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
      <div className="flex flex-1 flex-col mx-[100px]">
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