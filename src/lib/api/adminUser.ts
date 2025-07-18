import { get, patch } from './fetchInstance';

// 사용자 정지/정지 해제
export const suspendUser = async (
  email: string,
  duration: number,
  reason?: string,
) => {
  const params = {
    duration: String(duration),
    ...(reason && { reason }),
  };
  const stringifiedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>,
  );
  const queryString = new URLSearchParams(stringifiedParams).toString();
  return patch(`/api/admin/users/${email}/suspend?${queryString}`, null);
};

// 모든 사용자 조회
export const getAllUsers = async () => {
  return get('/api/admin/users');
};

// 특정 사용자 조회 (이메일)
export const getUser_1 = async (email: string) => {
  return get(`/api/admin/users/${email}`);
};

// 특정 사용자 조회 (닉네임)
export const getIUserByNickname = async (nickname: string) => {
  return get(`/api/admin/users/nickname/${nickname}`);
};
