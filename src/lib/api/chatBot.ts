import axios from './axiosInstance';
import { RecommendRequest } from '@/types/event'; // RecommendRequest는 event.d.ts에 정의되어 있음

// AI 빠른 추천 기능 (모임)
export const quickRecommendGroup = async (data: RecommendRequest) => {
  return axios.post('/api/chatBots/group', data);
};

// AI 빠른 추천 기능 (컨텐츠)
export const quickRecommendContent = async (data: RecommendRequest) => {
  return axios.post('/api/chatBots/content', data);
};

// 수정 예정 (chat)
// TODO: API 명세 확정 후 정확한 타입으로 변경 필요
export const chat = async (data: unknown) => {
  return axios.post('/api/chatBots/chat', data);
};