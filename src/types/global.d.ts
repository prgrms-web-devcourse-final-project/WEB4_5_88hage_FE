declare module 'react-big-calendar';

declare interface ContentCategory {
  id: number;
  category: string;
}

declare interface GroupBookmark {
  id: number;
  email: string;
  group: number;
}

declare interface ApiResponse<T = any> {
  code: string;
  message: string;
  reason?: string;
  data: T;
}

declare interface MessageDTO {
  id: number;
  content: string;
  readAt?: string; // date-time
  sender: string;
  receiver: string;
  isRead: boolean;
}

declare interface ReportRequest {
  reportedUserEmail?: string;
  reason: string;
  reportType: 'CHAT' | 'POST';
  targetId: number;
}

declare interface AdminReportProcessRequest {
  takeAction: boolean;
  suspendDays?: number;
  adminComment?: string;
}

declare interface RecommendRequest {
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

declare interface ChatHistoryEntry {
  user: string;
  ai: string;
}

declare interface ChatBotRequest {
  chatBotHistory: ChatHistoryEntry[];
  userMessage: string;
}

export interface CalendarContentRequest {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}
