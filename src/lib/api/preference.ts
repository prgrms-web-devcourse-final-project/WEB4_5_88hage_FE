import axios from './axiosInstance';
import type { PreferenceUpdateRequest } from '@/types/preference';

// 사용자 취향 조회
export const getPreferences = async () => {
  return axios.get('/preferences');
};

// 사용자 취향 수정
export const updatePreferences = async (data: PreferenceUpdateRequest) => {
  return axios.put('/preferences', data);
};
