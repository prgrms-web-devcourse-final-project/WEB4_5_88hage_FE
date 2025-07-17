import axios from './axiosInstance';
import type { PreferenceRequest } from '@/types/preference';

// 사용자 취향 조회
export const getPreferences = async () => {
  return axios.get('/preferences');
};

// 사용자 취향 수정
export const updatePreferences = async (data: PreferenceRequest) => {
  return axios.put('/preferences', data);
};

// 사용자 취향 등록 (첫 등록시만)
export const registerPreferences = async (data: PreferenceRequest) => {
  return axios.put('/preferences', data);
};
