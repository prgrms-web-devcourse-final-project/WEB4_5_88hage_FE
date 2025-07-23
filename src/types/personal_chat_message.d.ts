declare interface PersonalChatMessage {
  id: number;
  activated: boolean;
  created_at: string;
  personal_chat_room_id: number;
  modified_at: string;
  message: string;
  sender_email: string;
}
