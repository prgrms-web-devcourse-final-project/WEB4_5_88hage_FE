import axios from './axiosInstance';
import type {
  NoticeCreateRequest,
  NoticeDetail,
  NoticeListItem,
} from '@/types/notice';

// 공지사항 생성
export const createNotice = async (data: NoticeCreateRequest) => {
  return axios.post('/notices', data);
};

// 공지사항 상세 조회
export const getNoticeDetail = async (noticeId: string) => {
  return axios.get<NoticeDetail>(`/notices/${noticeId}`);
};

// 공지사항 목록 조회
export const getNoticeList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<NoticeListItem[]>('/notices');
};
