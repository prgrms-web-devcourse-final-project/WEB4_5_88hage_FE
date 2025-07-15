import DashboardLayout from '@/components/layout/DashboardLayout';

export default function layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
