import { NoticeListItem, NoticeDetail, NoticeCreateRequest } from '@/types/notice';
import { get, post, put, del } from './fetchInstance';

// 공지사항 생성
export const createNotice = async (data: NoticeCreateRequest) => {
  return post<number>('/api/notices', data);
};

// 공지사항 상세 조회
export const getNoticeById = async (id: number) => {
  const response = await get<NoticeDetail>(`/api/notices/${id}`);
  return response;
};

// 공지사항 목록 조회
export const getAllNotices = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return get<NoticeListItem[]>('/api/notices');
};

// 공지사항 수정
export const updateNotice = async (id: number, data: NoticeCreateRequest) => {
  return put<number>(`/api/notices/${id}`, data);
};

// 공지사항 삭제
export const deleteNotice = async (id: number) => {
  await del(`/api/notices/${id}`);
};