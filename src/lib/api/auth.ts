import { post } from './fetchInstance';

// 로그인: 응답 헤더의 Authorization, Refresh-Token로 토큰 발급
export const login = async (
  email: string,
  password: string,
  rememberMe = false,
) => {

  return post('/auth/login', { email, password, rememberMe });

};
