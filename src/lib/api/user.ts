import {
  CurrentUserInfo,
  NicknameVerificationResponse,
  ServiceResponse,
} from '@/types/api';
import { get, post, put, patch } from './fetchInstance';

// 회원 정보 조회 (현재 로그인한 사용자)
export const getUserInfo = async (): Promise<
  ServiceResponse<CurrentUserInfo>
> => {
  return get<ServiceResponse<CurrentUserInfo>>('/api/users/info');
};

// 유저 상세 정보 조회 (이메일로 조회)
export const getUserDetailInfoByEmail = async (
  email: string,
): Promise<ServiceResponse<UserInfo>> => {
  return get<ServiceResponse<UserInfo>>(`/api/userInfos/${email}`);
};

// 회원 정보 수정
export const updateUserInfo = async (data: UserInfoRequest) => {
  return put('/api/users/info', data);
};

// 회원가입 이메일 인증
export const verifySignupEmail = async (code: string) => {
  return post(`/api/users/verify/signup?code=${code}`, null);
};

// 닉네임 중복 검사
export const verifyNickname = async (
  nickname: string,
): Promise<NicknameVerificationResponse> => {
  return post('/api/users/verify/nickname', { nickname });
};

// 인증 코드 검증
export const verifyAuthCode = async (code: string, email: string) => {
  return post(`/api/users/verify/code/${email}`, { code });
};

// 회원가입
export const signup = async (data: SignupRequest) => {
  return post('/api/users/signup', data);
};

// 회원가입 인증 메일 재발송
export const resendSignupEmail = async (email: string) => {
  return post(`/api/users/send/signup/${email}`, {});
};

// 인증 코드 메일 발송
export const sendCodeEmail = async (email: string) => {
  return post(`/api/users/send/code/${email}`, {});
};

// 회원 탈퇴
export const withdrawUser = async () => {
  return patch('/api/users', {});
};

// 비밀번호 변경
export const changePassword = async (
  data: ChangePasswordRequest,
  email: string,
) => {
  return patch(`/api/users/change/password/${email}`, data);
};

// 닉네임 변경
export const changeNickname = async (nickname: string) => {
  return patch('/api/users/change/nickname', {
    nickname,
  });
};

// OAuth2 회원가입
export const updateOAuth2User = async (data: OAuth2SignupRequest) => {
  return patch('/api/users/oauth2/signup', data);
};

// 좌표 조회
export const getCoordinate = async (): Promise<UserCoordinate> => {
  const response = await get<UserCoordinate>('/api/users/coordinate');
  return response;
};

// 좌표 업데이트
export const updateCoordinate = async (latitude: number, longitude: number) => {
  return post('/api/users/coordinate', { latitude, longitude });
};
