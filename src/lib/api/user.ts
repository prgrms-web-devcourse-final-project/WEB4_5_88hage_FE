import {
  ChangePasswordRequest,
  SignupRequest,
  UserInfoRequest,
  OAuth2SignupRequest,
} from '@/types/auth';
import { UserCoordinate } from '@/types/user';
import axios from './axiosInstance';

// 회원 정보 조회
export const getUserInfo = async () => {
  return axios.get('/api/users/info');
};

// 회원 정보 수정
export const updateUserInfo = async (data: UserInfoRequest) => {
  return axios.put('/api/users/info', data);
};

// 회원가입 이메일 인증
export const verifySignupEmail = async (code: string) => {
  return axios.post('/api/users/verify/signup', null, { params: { code } });
};

// 닉네임 중복 검사
export const verifyNickname = async (nickname: string) => {
  return axios.post('/api/users/verify/nickname', { nickname });
};

// 인증 코드 검증
export const verifyAuthCode = async (code: string) => {
  return axios.post('/api/users/verify/code', { code });
};

// 회원가입
export const signup = async (data: SignupRequest) => {
  return axios.post('/api/users/signup', data);
};

// 회원가입 인증 메일 재발송
export const resendSignupEmail = async (email: string) => {
  return axios.post(`/api/users/send/signup/${email}`);
};

// 인증 코드 메일 발송
export const sendCodeEmail = async () => {
  return axios.post('/api/users/send/code');
};

// 회원 탈퇴
export const withdrawUser = async () => {
  return axios.patch('/api/users');
};

// 비밀번호 변경
export const changePassword = async (data: ChangePasswordRequest) => {
  return axios.patch('/api/users/change/password', data);
};

// 닉네임 변경
export const changeNickname = async (nickname: string) => {
  return axios.patch('/api/users/change/nickname', { nickname });
};

// OAuth2 회원가입
export const updateOAuth2User = async (data: OAuth2SignupRequest) => {
  return axios.patch('/api/users/oauth2/signup', data);
};

// 좌표 조회
export const getCoordinate = async (): Promise<UserCoordinate> => {
  const response = await axios.get('/api/users/coordinate');
  return response.data;
};