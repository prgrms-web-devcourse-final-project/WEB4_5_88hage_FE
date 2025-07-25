import { post } from './fetchInstance';

interface LoginResponse {
  code: string;
  message: string;
  reason: string | null;
  data: {
    accessToken: string;
    grantType: string;
    expiresIn: number;
  };
}

// 로그인: 응답 헤더의 Authorization, Refresh-Token로 토큰 발급
export const login = async (
  email: string,
  password: string,
  rememberMe = false,
) => {
  return post<LoginResponse>('/api/auth/login', {
    email,
    password,
    rememberMe,
  });
};
