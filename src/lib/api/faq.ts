import { FAQ, FaqCreateRequest, FaqUpdateRequest } from '@/types/faq';
import axios from './axiosInstance';

// FAQ 생성
export const createFAQ = async (data: FaqCreateRequest): Promise<void> => {
  await axios.post('/api/faqs', data);
};

// 모든 FAQ 목록 조회
export const getFAQs = async (): Promise<FAQ[]> => {
  const response = await axios.get('/api/faqs');
  return response.data;
};

// ID값인 FAQ삭제
export const deleteFAQ = async (id: number): Promise<void> => {
  await axios.delete(`/api/faqs/${id}`);
};

// FAQ 수정
export const updateFAQ = async (
  id: number,
  data: FaqUpdateRequest,
): Promise<void> => {
  await axios.put(`/api/faqs/${id}`, data);
};

// ID로 FAQ 조회
export const getFAQById = async (id: number): Promise<FAQ> => {
  const response = await axios.get(`/api/faqs/${id}`);
  return response.data;
};
