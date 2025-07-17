export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  latitude: number;
  longitude: number;
  nickname: string;
  address: string;
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
