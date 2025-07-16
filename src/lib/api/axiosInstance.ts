import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const message =
      err.response?.data?.message || '알 수 없는 오류가 발생했습니다.';

    switch (status) {
      case 400:
        console.warn('[400 Bad Request] 요청이 잘못되었습니다.');
        alert('요청 데이터가 올바르지 않습니다.');
        break;

      case 401:
        console.warn('[401 Unauthorized] 인증이 만료되었습니다.');
        alert('로그인이 필요합니다.');
        window.location.href = '/login'; // 또는 사용자 상태 초기화
        break;

      case 403:
        console.warn('[403 Forbidden] 권한이 없습니다.');
        alert('이 작업을 수행할 권한이 없습니다.');
        break;

      case 404:
        console.warn('[404 Not Found] API를 찾을 수 없습니다.');
        alert('요청한 정보를 찾을 수 없습니다.');
        break;

      case 409:
        console.warn('[409 Conflict] 중복 데이터입니다.');
        alert('이미 존재하는 정보입니다.');
        break;

      case 500:
        console.error('[500 Server Error] 서버 내부 오류.');
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;

      default:
        console.warn(`[${status}] 예외 응답`);
        alert(message);
        break;
    }

    return Promise.reject(err); // 호출한 쪽에서 catch로 받을 수 있게 reject
  },
);

export default instance;
