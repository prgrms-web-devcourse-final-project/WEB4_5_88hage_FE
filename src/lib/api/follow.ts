import axios from './axiosInstance';
import { Follower, Following } from '@/types/user';

// API 요청 시 사용할 파라미터 타입을 정의합니다.
interface GetFollowParams {
  page?: number;
  size?: number;
  sort?: string; // 예: 'createdAt,desc'
}

// 사용자 팔로우
export const followUser = async (targetEmail: string): Promise<void> => {
  await axios.post(`/api/follows/${encodeURIComponent(targetEmail)}`);
};

// 사용자 언팔로우
export const unfollowUser = async (targetEmail: string): Promise<void> => {
  await axios.delete(`/api/follows/${encodeURIComponent(targetEmail)}`);
};

// 특정 사용자에 대한 자신의 팔로잉 여부 확인
export const checkFollowingStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await axios.get<{ isFollowing: boolean }>(
    '/api/follows/status/following',
    {
      params: { targetEmail }, // 파라미터 이름을 명세에 맞게 수정
    },
  );
  return response.data.isFollowing;
};

// 특정 사용자가 자신을 팔로우했는지 확인 (팔로워 여부)
export const checkFollowerStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await axios.get<{ isFollower: boolean }>(
    '/api/follows/status/follower',
    {
      params: { targetEmail }, // 파라미터 이름을 명세에 맞게 수정
    },
  );
  return response.data.isFollower;
};

// 팔로잉 목록 조회 (페이지네이션 및 정렬 기능 추가)
export const getFollowings = async (
  params: GetFollowParams = {},
): Promise<Following[]> => {
  const response = await axios.get('/api/follows/followings', { params });
  return response.data;
};

// 팔로워 목록 조회
export const getFollowers = async (
  params: GetFollowParams = {},
): Promise<Follower[]> => {
  const response = await axios.get('/api/follows/followers', { params });
  return response.data;
};

// 팔로잉 수 조회
export const countFollowings = async (): Promise<number> => {
  const response = await axios.get<{ count: number }>(
    '/api/follows/count/followings',
  );
  return response.data.count;
};

// 팔로워 수 조회
export const countFollowers = async (): Promise<number> => {
  const response = await axios.get<{ count: number }>(
    '/api/follows/count/followers',
  );
  return response.data.count;
};
