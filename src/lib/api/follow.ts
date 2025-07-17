import axios from './axiosInstance';

// 사용자 팔로우
export const followUser = async (targetEmail: string): Promise<void> => {
  await axios.post(`/api/follows/${encodeURIComponent(targetEmail)}`);
};

// 언팔
export const unfollowUser = async (targetEmail: string): Promise<void> => {
  await axios.delete(`/api/follows/${encodeURIComponent(targetEmail)}`);
};

// 특정 사용자 자신의 팔로잉 여부 확인
export const checkFollowingStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await axios.get('/api/follows/status/following', {
    params: { target: targetEmail },
  });
  return response.data; // true 또는 false 반환 예상
};

// 팔로워 여부
export const checkFollowerStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await axios.get('/api/follows/status/follower', {
    params: { target: targetEmail },
  });
  return response.data; // true 또는 false 반환 예상
};

// 팔로잉 조회
export const getFollowings = async (): Promise<Following[]> => {
  const response = await axios.get('/api/follows/followings');
  return response.data;
};
