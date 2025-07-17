import axios from './axiosInstance';

// 채팅 기록 조회
export const getChatHistory = async (roomId: string, type: string) => {
  return axios.get(`/api/chats/${roomId}/${type}/history`);
};

// 개인 채팅방 생성
export const createPersonalChatRoom = async (userEmail: string) => {
  return axios.post('/api/chatRooms/personalRooms', { userEmail });
};

// 개인 채팅방 조회
export const getMyPersonalChatRooms = async () => {
  return axios.get('/api/chatRooms/rooms/my');
};
