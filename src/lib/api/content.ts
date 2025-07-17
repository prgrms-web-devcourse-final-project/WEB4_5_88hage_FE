import axios from './axiosInstance';
import { GetContentsParams } from '@/types/content';

// 컨텐츠 목록 조회
export const getAllContents = async (params: GetContentsParams = {}) => {
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['selectedDate,DESC'], // 명세에 따라 기본 정렬 기준 추가
  };
  const mergedParams = { ...defaultParams, ...params };
  return axios.get('/api/contents', { params: mergedParams });
};

// 컨텐츠 상세 조회
export const getContent = async (id: number) => {
  return axios.get(`/api/contents/${id}`);
};
