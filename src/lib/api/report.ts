import axios from './axiosInstance';

interface ReportRequest {
  reportedUserEmail: string;
  reason: string;
  reportType: 'CHAT' | 'GROUP'; // 필요 시 ENUM 확장
  targetId: number;
}

export const reportContent = async (data: ReportRequest) => {
  return axios.post('/api/reports', data);
};
