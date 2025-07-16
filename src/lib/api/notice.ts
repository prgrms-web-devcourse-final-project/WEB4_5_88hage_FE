import { NoticeListItem } from '@/types/notice';
import axios from './axiosInstance';

// 공지사항 생성
export const createNotice = async (id: number, message: string) => {
  return axios.post<number>('/notices', { message });
};

// 공지사항 상세 조회
export const getNoticeById = async (id: number) => {
  const response = await axios.get(`/api/notices/${id}`);
  return response.data; // { id, message }
};

// 공지사항 목록 조회
export const getNoticeList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<NoticeListItem[]>('/notices');
};

// 공지사항 수정
export const updateNotice = async (id: number, message: string) => {
  return axios.put<number>(`/api/notices/${id}`, { message });
};

// 공지사항 삭제
export const deleteNotice = async (id: number) => {
  return axios.delete(`/api/notices/${id}`);
};
