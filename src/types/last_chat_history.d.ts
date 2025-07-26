declare interface LastChatHistory {
  id: number;
  activated: boolean;
  time: string;
  modified_at: string;
  room_id: number;
  message: string;
  room_type: 'GROUP_CHAT' | 'PERSONAL_CHAT';
  sender_email: string;
  sender_nickname: string;
}
