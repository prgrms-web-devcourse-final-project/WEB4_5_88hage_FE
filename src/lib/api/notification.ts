import { Notification, NotificationCreateRequest } from '@/types/notification';
import axios from './axiosInstance';

// 알림 상세 조회
export const getNotificationById = async (id: number) => {
  return await axios.get(`/api/notifications/${id}`);
};

// 알림 수정 (예: 읽음 상태 변경)
export const updateNotification = async (id: number, data: Notification) => {
  return axios.put(`/api/notifications/${id}`, data);
};

// 알림 삭제
export const deleteNotificationById = async (id: number) => {
  return axios.delete(`/api/notifications/${id}`);
};

// 모든 알림 조회
export const getAllNotifications = async () => {
  return axios.get('/api/notifications');
};

// 알림 생성
export const createNotification = async (data: NotificationCreateRequest) => {
  return axios.post<number>('/api/notifications', data);
};
