import { Notification, NotificationCreateRequest } from '@/types/notification';
import { get, post, put, del, patch } from './fetchInstance';

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

// 개별 알림 읽음 처리
export const markNotificationAsRead = async (id: number) => {
  return patch(`/api/notifications/${id}/read`, null);
};

// 전체 알림 읽음 처리
export const markAllNotificationsAsRead = async (email: string) => {
  return patch(`/api/notifications/read-all?email=${email}`, null);
};

// 안읽은 알림 조회
export const getUnreadNotifications = async (email: string) => {
  return get(`/api/notifications/unread?email=${email}`);
};

// 안읽은 알림 수 조회
export const getUnreadNotificationCount = async (email: string) => {
  return get(`/api/notifications/unread-count?email=${email}`);
};

// 최근 알림 조회
export const getRecentNotifications = async (email: string) => {
  return get(`/api/notifications/recent?email=${email}`);
};

// 모든 알림 삭제
export const deleteAllNotifications = async (email: string) => {
  await del(`/api/notifications/all?email=${email}`);
};
