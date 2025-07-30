import fetchInstance, { get } from './fetchInstance';

// 신고 처리
export const processReport = async (
  id: number,
  data: AdminReportProcessRequest,
) => {
  return fetchInstance(`/api/admin/reports/${id}`, { method: 'PATCH', data });
};

// 관리자 신고 목록 조회
export const getAllReports = async (
  status: 'all' | 'resolved' | 'unresolved' = 'all',
) => {
  return get(`/api/admin/reports?status=${status}`);
};
