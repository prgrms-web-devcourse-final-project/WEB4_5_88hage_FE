import { post } from './fetchInstance';

interface ReportRequest {
  reportedUserEmail: string;
  reason: string;
  reportType: 'CHAT' | 'GROUP'; // 필요 시 ENUM 확장
  targetId: number;
}

export const reportContent = async (data: ReportRequest) => {
  return post('/api/reports', data);
};
