declare interface PersonalChatRoom {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  name: string;
  status: 'GROUP_CHAT' | 'PERSONAL_CHAT';
  user1email: string;
  user2email: string;
  useraemail: string;
  userbemail: string;
}
