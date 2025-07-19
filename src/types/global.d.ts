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

export interface RecommendRequest {
  eventType: 'CONTENT' | 'GROUP';
  startTime: string;
  endTime: string;
  address: string;
}

type WeatherInfo = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kakao: any;
}

export interface ChatHistoryEntry {
  user: string;
  ai: string;
}

export interface ChatBotRequest {
  chatBotHistory: ChatHistoryEntry[];
  userMessage: string;
}
