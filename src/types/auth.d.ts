export interface UserData {
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

export interface UserInfoUpdateRequest {
  address?: string;
  latitude?: number;
  longitude?: number;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE';
  isMarketingAgreed?: boolean;
}

export interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
}
