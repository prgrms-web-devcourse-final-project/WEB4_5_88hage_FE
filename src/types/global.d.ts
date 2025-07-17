declare module 'react-big-calendar';

type WeatherInfo = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};

type SignupUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  latitude: number; // 위도
  longitude: number; // 경도
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
};
