import {
  Group,
  GroupHashtag,
  GroupSearchQueryParams,
  GroupRequest,
} from '@/types/group';
import { get, post, put, del } from './fetchInstance';

// 모임 상세 조회
export const getGroupById = async (groupId: number): Promise<Group> => {
  const res = await get<Group>(`/api/groups/${groupId}`);
  return res;
};

// 모임 수정
export const updateGroup = async (groupId: number, data: GroupRequest) => {
  await put(`/api/groups/${groupId}`, data);
};

// 모임 삭제
export const deleteGroup = async (groupId: number): Promise<void> => {
  await del(`/api/groups/${groupId}`);
};

// 모임 생성
export const createGroup = async (data: GroupRequest): Promise<number> => {
  const res = await post<number>('/api/groups/create', data);
  return res;
};

// 모임 완료
export const completeGroup = async (groupId: number) => {
  await post(`/api/groups/${groupId}/complete`, null);
};

// 모임 취소
export const cancelGroup = async (groupId: number) => {
  await post(`/api/groups/${groupId}/cancel`, null);
};

// 모임 검색 및 조회
export const searchGroups = async (
  params: GroupSearchQueryParams,
): Promise<Group[]> => {
  const stringifiedParams = Object.entries(params).reduce(
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
  const res = await get<Group[]>(`/api/groups/search?${queryString}`);
  return res;
};

// 내가 속한 모임 조회
export const getMyGroups = async (): Promise<Group[]> => {
  const res = await get<Group[]>('/api/groups/getMy');
  return res;
};

// 내가 리더 역할인 모임 조회
export const getLeaderMyGroups = async (): Promise<Group[]> => {
  const res = await get<Group[]>('/api/groups/getLeaderMy');
  return res;
};

// 모임에 해시태그 추가
export const createGroupHashtag = async (
  data: GroupHashtag,
): Promise<GroupHashtag> => {
  const res = await post<GroupHashtag>('/api/group-hashtags', data);
  return res;
};

// 모든 해시태그 목록 조회
export const getAllGroupHashtags = async (): Promise<GroupHashtag[]> => {
  const res = await get<GroupHashtag[]>('/api/group-hashtags');
  return res;
};

// 해시태그 삭제
export const deleteGroupHashtag = async (id: number): Promise<void> => {
  await del(`/api/group-hashtags/${id}`);
};

// 특정 모임 해시태그 정보 수정
export const updateGroupHashtag = async (
  id: number,
  data: GroupHashtag,
): Promise<GroupHashtag> => {
  const response = await put<GroupHashtag>(`/api/group-hashtags/${id}`, data);
  return response;
};

// 특정 모임 해시태그 조회
export const getGroupHashtagById = async (
  id: number,
): Promise<GroupHashtag> => {
  const response = await get<GroupHashtag>(`/api/group-hashtags/${id}`);
  return response;
};

// 자동 완성을 위한 단어 저장 (모임 해시태그)
export const saveWord = async (word: string) => {
  return post('/api/group-hashtags/save', { word });
};

// 자동 완성을 위한 단어 불러오기 (모임 해시태그)
export const completeWord = async () => {
  return get('/api/group-hashtags/complete');
};
