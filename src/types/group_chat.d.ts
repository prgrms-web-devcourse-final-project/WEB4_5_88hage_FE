declare interface GroupChatMessageRead {
  id: number;
  activated: boolean;
  created_at: string;
  group_chat_message_id: number;
  reader_email: string;
  modified_at: string;
}
declare interface GroupChatMessage {
  id: number;
  activated: boolean;
  created_at: string;
  group_chat_room_id: number;
  modified_at: string;
  message: string;
  sender_email: string;
}
declare interface GroupChatRoom {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  name: string;
  status: 'GROUP_CHAT' | 'PERSONAL_CHAT';
}
