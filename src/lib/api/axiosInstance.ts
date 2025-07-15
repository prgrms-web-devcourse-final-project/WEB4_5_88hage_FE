import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 응답 인터셉터 (에러 처리)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('인증 만료됨 - 자동 로그아웃 처리');
      // 예: router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default instance;
