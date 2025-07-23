import { get, post, put, del } from './fetchInstance';

export const getMessage = async (id: number): Promise<Message> => {
  return await get<Message>(`/api/messages/${id}`);
};

export const updateMessage = async (
  id: number,
  data: Message,
): Promise<Message> => {
  return await put<Message>(`/api/messages/${id}`, data);
};

export const deleteMessage = async (id: number) => {
  return await del(`/api/messages/${id}`);
};

export const getMessages = async (): Promise<Message[]> => {
  return await get<Message[]>('/api/messages');
};

export const createMessage = async (
  data: MessageCreateRequest,
): Promise<number> => {
  const response = await post<number>('/api/messages', data);
  return response;
};
