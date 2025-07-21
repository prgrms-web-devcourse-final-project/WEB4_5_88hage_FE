declare interface Notification {
  id: number;
  email: string;
  message: string;
  link?: string;
  isRead: boolean;
}

declare interface NotificationCreateRequest {
  email: string;
  message: string;
  link?: string;
  isRead?: boolean;
}

declare interface NotificationDTO {
  id: number;
  email: string;
  message: string;
  link?: string;
  isRead: boolean;
}