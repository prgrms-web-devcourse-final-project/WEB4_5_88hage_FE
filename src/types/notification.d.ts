declare interface Notification {
  id: number;
  activated: boolean;
  is_read: boolean;
  created_at: string;
  modified_at: string;
  email: string;
  link: string;
  message: string;
<<<<<<< HEAD
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
=======
  scheduled_at: string | null;
  sent_at: string | null;
  type: 'NOTICE' | 'SCHEDULE';
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
}