export interface Message {
  id: number;
  content: string;
  readAt: string | null;
  sender: string;
  receiver: string;
  isRead: boolean;
}

export interface MessageCreateRequest {
  content: string;
  sender: string;
  receiver: string;
  readAt?: string | null; // 선택적으로 보냄
  isRead?: boolean; // 기본
}
