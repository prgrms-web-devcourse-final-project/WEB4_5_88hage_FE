declare interface Message {
  id: number;
  activated: boolean;
  is_read: boolean;
  created_at: string;
  modified_at: string;
  read_at: string | null;
  content: string;
<<<<<<< HEAD
  readAt: string | null;
  sender: string;
  receiver: string;
  isRead: boolean;
}
declare interface MessageCreateRequest {
  content: string;
  sender: string;
  receiver: string;
  readAt?: string | null; // 선택적으로 보냄
  isRead?: boolean; // 기본
}
=======
  receiver_id: string;
  sender_id: string;
}
>>>>>>> 45499223a61c508f1315bed163fb415c001b49fb
