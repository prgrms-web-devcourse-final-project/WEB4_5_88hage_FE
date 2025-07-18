import { ChatBotRequest, RecommendRequest } from '@/types/global';
import axios from './axiosInstance';

// AI 빠른 추천 기능 (모임)
export const quickRecommendGroup = async (data: RecommendRequest) => {
  return axios.post('/api/chatBots/group', data);
};

// AI 빠른 추천 기능 (컨텐츠)
export const quickRecommendContent = async (data: RecommendRequest) => {
  return axios.post('/api/chatBots/content', data);
};

// 챗봇 대화 기능
export const chat = async (data: ChatBotRequest) => {
  return axios.post('/api/chatBots/chat', data);
};

// 챗봇 대화 종료 및 요약 기능
export const endChat = async (data: ChatBotRequest) => {
  return axios.post('/api/chatBots/end', data);
};
