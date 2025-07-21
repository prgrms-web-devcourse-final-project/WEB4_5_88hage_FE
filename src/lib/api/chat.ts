import { ChatRoom } from '@/types/chat';
import { get, post } from './fetchInstance';
import { LastChatHistory } from '@/types/last_chat_history';

// 채팅 기록 조회
export const getChatHistory = async (roomId: string, type: string) => {
  return get(`/api/chats/${roomId}/${type}/history`);
};

// 개인 채팅방 생성
export const createPersonalChatRoom = async (userEmail: string) => {
  return post('/api/chatRooms/personalRooms', { userEmail });
};

// 개인 채팅방 조회
export const getMyPersonalChatRooms = async (): Promise<ChatRoom[]> => {
  return get<ChatRoom[]>('/api/chatRooms/rooms/my');
};

// 마지막 채팅 조회
export const getLastChatHistory = async (
  roomId: number,
  type: 'GROUP_CHAT' | 'PERSONAL_CHAT',
): Promise<LastChatHistory> => {
  const res = await get<LastChatHistory>(
    `/api/chats/${roomId}/${type}/lastHistory`,
  );
  return res;
};
