export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
}

export interface UserInfoRequest {
  address: string;
  latitude: number;
  longitude: number;
  isMarketingAgreed: boolean;
}

export interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface OAuth2SignupRequest {
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
}

export interface VerifyCodeRequest {
  code: string;
}

export interface NicknameRequest {
  nickname: string;
}
