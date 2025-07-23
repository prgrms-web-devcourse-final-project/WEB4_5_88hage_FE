declare interface SignupRequest {
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

declare interface UserInfoRequest {
  address: string;
  latitude: number;
  longitude: number;
  isMarketingAgreed: boolean;
}

declare interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

declare interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

declare interface OAuth2SignupRequest {
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
}

declare interface VerifyCodeRequest {
  code: string;
}

declare interface NicknameRequest {
  nickname: string;
}

type GnbItem = {
  label: string;
  value?: string | undefined;
}

