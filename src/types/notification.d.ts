export interface Notification {
  id: number;
  email: string;
  message: string;
  link?: string;
  isRead: boolean;
}

export interface NotificationCreateRequest {
  email: string;
  message: string;
  link?: string;
  isRead?: boolean;
}

export interface NotificationDTO {
  id: number;
  email: string;
  message: string;
  link?: string;
  isRead: boolean;
}