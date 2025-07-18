import axios from './axiosInstance';

// 로그인: 응답 헤더의 Authorization, Refresh-Token로 토큰 발급
export const login = async (
  email: string,
  password: string,
  rememberMe = false,
) => {
  return axios.post('/auth/login', { email, password, rememberMe }, { withCredentials: true });
};
