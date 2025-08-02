import { ApiResponse } from '@/types/api';
import { get, post, put, patch } from './fetchInstance';

// 문의 작성
export const createInquiry = async (data: ContactRequest) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  formData.append('imagesChanged', String(data.imagesChanged));

  if (data.images) {
    data.images.forEach((image) => {
      formData.append(`images`, image);
    });
  }
  return post('/api/contacts', formData);
};

// 문의 목록 조회
export const getContacts = async (
  params?: GetContactsParams,
): Promise<ApiResponse<Inquiry>> => {
  const stringifiedParams = params
    ? Object.entries(params).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value.join(',');
          } else {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      )
    : {};

  const queryString =
    Object.keys(stringifiedParams).length > 0
      ? `?${new URLSearchParams(stringifiedParams).toString()}`
      : '';

  return get(`/api/contacts${queryString}`);
};

// 문의 수정
export const updateContact = async (contactId: number, formData: FormData) => {
  await put(`/api/contacts/${contactId}`, formData);
};

// ID 조회 문의 조회
export const getContactDetail = async (contactId: number): Promise<Inquiry> => {
  const res = await get<Inquiry>(`/api/contacts/${contactId}`);
  return res;
};

// 문의 삭제
export const deleteContact = async (contactId: number) => {
  await patch(`/api/contacts/${contactId}`, null);
};
