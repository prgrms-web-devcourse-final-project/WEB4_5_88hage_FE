declare interface Notification {
  id: number;
  activated: boolean;
  is_read: boolean;
  created_at: string;
  modified_at: string;
  email: string;
  link: string;
  message: string;
  scheduled_at: string | null;
  sent_at: string | null;
  type: 'NOTICE' | 'SCHEDULE';
}

export interface NotificationCreateRequest {
  id?: number;
  email: string;
  message: string;
  link: string;
  type: string;
  scheduledAt?: string;
  sentAt?: string;
  isRead?: boolean;
}