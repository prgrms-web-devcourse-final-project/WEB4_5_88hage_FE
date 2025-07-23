declare interface Message {
  id: number;
  activated: boolean;
  is_read: boolean;
  created_at: string;
  modified_at: string;
  read_at: string | null;
  content: string;
  receiver_id: string;
  sender_id: string;
}
