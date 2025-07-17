declare module 'react-big-calendar';

export interface ContentCategory {
  id: number;
  category: string;
}

export interface GroupBookmark {
  id: number;
  email: string;
  group: number;
}

export interface ApiResponse<T = any> {
  code: string;
  message: string;
  reason?: string;
  data: T;
}

export interface MessageDTO {
  id: number;
  content: string;
  readAt?: string; // date-time
  sender: string;
  receiver: string;
  isRead: boolean;
}

export interface ReportRequest {
  reportedUserEmail?: string;
  reason: string;
  reportType: 'CHAT' | 'POST';
  targetId: number;
}

export interface AdminReportProcessRequest {
  takeAction: boolean;
  suspendDays?: number;
  adminComment?: string;
}
