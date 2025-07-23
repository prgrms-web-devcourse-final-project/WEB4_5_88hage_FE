declare interface Chat {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  room_id: number | null;
  message: string | null;
  room_type: 'GROUP_CHAT' | 'PERSONAL_CHAT' | null;
  sender_email: string | null;
  sender_nickname: string | null;
}
