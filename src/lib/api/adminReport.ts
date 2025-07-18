import axios from './axiosInstance';
import { AdminReportProcessRequest } from '@/types/global';

// 신고 처리
export const processReport = async (
  id: number,
  data: AdminReportProcessRequest,
) => {
  return axios.patch(`/api/admin/reports/${id}`, data);
};

// 관리자 신고 목록 조회
export const getAllReports = async (
  status: 'all' | 'resolved' | 'unresolved' = 'all',
) => {
  return axios.get('/api/admin/reports', { params: { status } });
};
