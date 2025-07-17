import axios from './axiosInstance';

// 컨텐츠 목록 조회
export const getAllContents = async () => {
  return axios.get('/api/contents');
};

// 컨텐츠 상세 조회
export const getContent = async (id: number) => {
  return axios.get(`/api/contents/${id}`);
};
