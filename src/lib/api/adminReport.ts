import { get, patch } from './fetchInstance';
import { AdminReportProcessRequest } from '@/types/global';

// Define a basic ReportItem interface for now.
// This should ideally be in a shared types file (e.g., types/report.d.ts)
interface ReportItem {
  id: number;
  reportedUserEmail?: string;
  reason: string;
  reportType: 'CHAT' | 'POST';
  targetId: number;
  status: 'resolved' | 'unresolved'; // Assuming status is part of the returned report item
  // Add other relevant fields that might be returned by the API
}

// 신고 처리
export const processReport = async (
  id: number,
  data: AdminReportProcessRequest,
) => {
  return patch(`/api/admin/reports/${id}`, data);
};

// 관리자 신고 목록 조회
export const getAllReports = async (
  status: 'all' | 'resolved' | 'unresolved' = 'all',
): Promise<ReportItem[]> => {
  return get<ReportItem[]>(`/api/admin/reports?status=${status}`);
};
