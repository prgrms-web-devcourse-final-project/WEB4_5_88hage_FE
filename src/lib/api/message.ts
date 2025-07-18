import { Message, MessageCreateRequest } from '@/types/message';
import axios from './axiosInstance';

export const getMessage = async (id: number): Promise<Message> => {
  return await axios.get(`/api/messages/${id}`);
};

export const updateMessage = async (
  id: number,
  data: Message,
): Promise<Message> => {
  return await axios.put(`/api/messages/${id}`, data);
};

export const deleteMessage = async (id: number) => {
  return await axios.delete(`/api/messages/${id}`);
};

export const getMessages = async (): Promise<Message[]> => {
  return await axios.get('/api/messages');
};

export const createMessage = async (
  data: MessageCreateRequest,
): Promise<number> => {
  const response = await axios.post<number>('/api/messages', data);
  return response.data;
};
