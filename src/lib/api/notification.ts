import { Notification, NotificationCreateRequest } from '@/types/notification';
import { get, post, put, del } from './fetchInstance';

// 알림 상세 조회
export const getNotificationById = async (id: number) => {
  return await get(`/api/notifications/${id}`);
};

// 알림 수정 (예: 읽음 상태 변경)
export const updateNotification = async (id: number, data: Notification) => {
  return put(`/api/notifications/${id}`, data);
};

// 알림 삭제
export const deleteNotificationById = async (id: number) => {
  await del(`/api/notifications/${id}`);
};

// 모든 알림 조회
export const getAllNotifications = async () => {
  return get('/api/notifications');
};

// 알림 생성
export const createNotification = async (data: NotificationCreateRequest) => {
  return post('/api/notifications', data);
};
