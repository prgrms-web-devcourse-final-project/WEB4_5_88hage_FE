import axios from './axiosInstance';

// 사용자 정지/정지 해제
export const suspendUser = async (
  email: string,
  duration: number,
  reason?: string,
) => {
  return axios.patch(`/api/admin/users/${email}/suspend`, null, {
    params: { duration, reason },
  });
};

// 모든 사용자 조회
export const getAllUsers = async () => {
  return axios.get('/api/admin/users');
};

// 특정 사용자 조회 (이메일)
export const getUser_1 = async (email: string) => {
  return axios.get(`/api/admin/users/${email}`);
};

// 특정 사용자 조회 (닉네임)
export const getIUserByNickname = async (nickname: string) => {
  return axios.get(`/api/admin/users/nickname/${nickname}`);
};
