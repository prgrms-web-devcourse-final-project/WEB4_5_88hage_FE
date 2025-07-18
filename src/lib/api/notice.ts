import { NoticeListItem, NoticeDetail, NoticeCreateRequest } from '@/types/notice';
import axios from './axiosInstance';

// 공지사항 생성
export const createNotice = async (data: NoticeCreateRequest) => {
  return axios.post<number>('/api/notices', data);
};

// 공지사항 상세 조회
export const getNoticeById = async (id: number) => {
  const response = await axios.get<NoticeDetail>(`/api/notices/${id}`);
  return response.data;
};

// 공지사항 목록 조회
export const getAllNotices = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<NoticeListItem[]>('/api/notices');
};

// 공지사항 수정
export const updateNotice = async (id: number, data: NoticeCreateRequest) => {
  return axios.put<number>(`/api/notices/${id}`, data);
};

// 공지사항 삭제
export const deleteNotice = async (id: number) => {
  return axios.delete(`/api/notices/${id}`);
};