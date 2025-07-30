import { get, post } from './fetchInstance';

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
  return get<ChatRoom[]>('/api/chatRooms/my');
};

// 마지막 채팅 조회
export const getLastChatHistory = async (
  roomId: number,
  type: 'GROUP_CHAT' | 'PERSONAL_CHAT',
): Promise<LastChatHistory | null> => {
  try {
    const response = await get<{ data: LastChatHistory }>(
      `/api/chats/${roomId}/${type}/lastHistory`,
    );
    return response.data; // data 객체를 반환
  } catch (error) {
    // 404 에러 (채팅 내역 없음) 처리
    if (error instanceof Response) {
      if (error.status === 404) {
        return null;
      }
    }
    throw error; // 다른 에러는 다시 던짐
  }
};
