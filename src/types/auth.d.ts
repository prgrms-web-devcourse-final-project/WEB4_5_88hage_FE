export interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
}
