import axios from './axiosInstance';
import {
  ContactRequest,
  GetContactsParams,
  Inquiry,
} from '../../types/inquiry';

// 문의 작성
export const createInquiry = async (data: ContactRequest) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  formData.append('imagesChanged', String(data.imagesChanged));

  if (data.images) {
    data.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  }

  const response = await axios.post('/api/contacts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 문의 목록 조회
export const getContacts = async (params?: GetContactsParams) => {
  return axios.get('/api/contacts', { params });
};

// 문의 수정
export const updateContact = async (contactId: number, formData: FormData) => {
  await axios.put(`/api/contacts/${contactId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ID 조회 문의 조회
export const getContactDetail = async (contactId: number): Promise<Inquiry> => {
  const res = await axios.get(`/api/contacts/${contactId}`);
  return res.data;
};

// 문의 삭제
export const deleteContact = async (contactId: number) => {
  await axios.patch(`/api/contacts/${contactId}`);
};
