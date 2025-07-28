import { get, post, del } from './fetchInstance';

interface GetFollowParams {
  page?: number;
  size?: number;
  sort?: string[];
}

// 사용자 팔로우
export const followUser = async (targetEmail: string): Promise<void> => {
  await post(`/api/follows/${encodeURIComponent(targetEmail)}`, null);
};

// 언팔
export const unfollowUser = async (targetEmail: string): Promise<void> => {
  await del(`/api/follows/${encodeURIComponent(targetEmail)}`);
};

// 특정 사용자 자신의 팔로잉 여부 확인
export const checkFollowingStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await get<{ data: boolean }>(
    `/api/follows/status/following?target=${targetEmail}`,
  );
  return response.data;
};

// 팔로워 여부
export const checkFollowerStatus = async (
  targetEmail: string,
): Promise<boolean> => {
  const response = await get<{ isFollower: boolean }>(
    `/api/follows/status/follower?targetEmail=${targetEmail}`,
  );
  return response.isFollower;
};

// 팔로잉 목록 조회 (페이지네이션 및 정렬 기능 추가)
import { ApiResponse } from '@/types/api';

export const getFollowings = async (
  params: GetFollowParams = {},
): Promise<ApiResponse<Following>> => {
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['nickname', 'ASC'],
  };
  const mergedParams = { ...defaultParams, ...params };
  const stringifiedParams = Object.entries(mergedParams).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(',');
      } else {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );
  const queryString = new URLSearchParams(stringifiedParams).toString();
  const response = await get<ApiResponse<Following>>(
    `/api/follows/followings?${queryString}`,
  );
  return response;
};

// 팔로워 목록 조회
export const getFollowers = async (
  params: GetFollowParams = {},
): Promise<ApiResponse<Follower>> => {
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['nickname', 'ASC'], // 팔로워 조회도 동일한 기본값 적용
  };
  const mergedParams = { ...defaultParams, ...params };
  const stringifiedParams = Object.entries(mergedParams).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(',');
      } else {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );
  const queryString = new URLSearchParams(stringifiedParams).toString();
  const response = await get<ApiResponse<Follower>>(
    `/api/follows/followers?${queryString}`,
  );
  return response;
};

// 팔로잉 수 조회
export const countFollowings = async (): Promise<number> => {
  const response = await get<{ count: number }>(
    '/api/follows/count/followings',
  );
  return response.count;
};

// 팔로워 수 조회
export const countFollowers = async (): Promise<number> => {
  const response = await get<{ count: number }>('/api/follows/count/followers');
  return response.count;
};
