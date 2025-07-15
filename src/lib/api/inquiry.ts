import axios from './axiosInstance';
import type {
  InquiryCreateRequest,
  InquiryDetail,
  InquiryListItem,
} from '@/types/inquiry';

// 문의 생성
export const createInquiry = async (data: InquiryCreateRequest) => {
  return axios.post('/inquiries', data);
};

// 문의 상세 조회
export const getInquiryDetail = async (inquiryId: string) => {
  return axios.get<InquiryDetail>(`/inquiries/${inquiryId}`);
};

// 문의 목록 조회
export const getInquiryList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<InquiryListItem[]>('/inquiries');
};
