import { userData } from '@/types/auth';
import axios from './axiosInstance';

// 로그인: 응답 헤더의 Authorization, Refresh-Token로 토큰 발급
export const login = async (
  email: string,
  password: string,
  rememberMe = false,
) => {
  return axios.post('/auth/login', { email, password, rememberMe });
};

// 로그아웃
export const logout = async () => {
  return axios.post('/auth/logout');
};

// 리프레시 토큰으로 액세스 토큰 재발급
export const reissue = async () => {
  return axios.post('/auth/reissue');
};
// 회원가입
export const signup = async (userData: userData) => {
  return axios.post('/auth/signup', userData);
};

// 이메일 중복 확인
export const checkEmail = async (email: string) => {
  return axios.get(`/auth/check-email?email=${email}`);
};

// 닉네임 중복 확인
export const checkNickname = async (nickname: string) => {
  return axios.get(`/auth/check-nickname?nickname=${nickname}`);
};

// 이메일 인증 코드 발송
export const sendVerificationCode = async (email: string) => {
  return axios.post('/auth/email-verification/send', { email });
};

// 이메일 인증 코드 확인
export const verifyCode = async (email: string, code: string) => {
  return axios.post('/auth/email-verification/verify', { email, code });
};
