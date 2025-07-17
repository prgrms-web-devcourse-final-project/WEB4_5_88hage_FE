import axios from './axiosInstance';
import { Follower, Following } from '@/types/user';

interface GetFollowParams {
  page?: number;
  size?: number;
  sort?: string[];
}

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
  const response = await axios.get<{ isFollowing: boolean }>(
    '/api/follows/status/following',
    {
      params: { targetEmail }, // 파라미터 이름을 명세에 맞게 수정
    },
  );
  return response.data.isFollowing;
};

// 팔로워 여부
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
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['nickname', 'ASC'],
  };
  const mergedParams = { ...defaultParams, ...params };
  const response = await axios.get('/api/follows/followings', {
    params: mergedParams,
  });
  return response.data;
};

// 팔로워 목록 조회
export const getFollowers = async (
  params: GetFollowParams = {},
): Promise<Follower[]> => {
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['nickname', 'ASC'], // 팔로워 조회도 동일한 기본값 적용
  };
  const mergedParams = { ...defaultParams, ...params };
  const response = await axios.get('/api/follows/followers', {
    params: mergedParams,
  });
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
