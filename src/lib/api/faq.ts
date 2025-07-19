import { FAQ, FaqCreateRequest, FaqUpdateRequest } from '@/types/faq';
import { get, post, put, del } from './fetchInstance';

// FAQ 생성
export const createFAQ = async (data: FaqCreateRequest): Promise<void> => {
  await post('/api/faqs', data);
};

// 모든 FAQ 목록 조회
export const getFAQs = async (): Promise<FAQ[]> => {
  const response = await get<FAQ[]>('/api/faqs');
  return response;
};

// ID값인 FAQ삭제
export const deleteFAQ = async (id: number): Promise<void> => {
  await del(`/api/faqs/${id}`);
};

// FAQ 수정
export const updateFAQ = async (
  id: number,
  data: FaqUpdateRequest,
): Promise<void> => {
  await put(`/api/faqs/${id}`, data);
};

// ID로 FAQ 조회
export const getFAQById = async (id: number): Promise<FAQ> => {
  const response = await get<FAQ>(`/api/faqs/${id}`);
  return response;
};
