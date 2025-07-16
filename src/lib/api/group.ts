import { Group, GroupSearchQueryParams } from '@/types/group';
import axios from './axiosInstance';

// 모임 상세 조회
export const getGroupById = async (groupId: number): Promise<Group> => {
  const res = await axios.get<Group>(`/api/groups/${groupId}`);
  return res.data;
};

// 모임 수정
export const updateGroup = async (groupId: number, formData: FormData) => {
  await axios.put(`/api/groups/${groupId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 모임 삭제
export const deleteGroup = async (groupId: number): Promise<void> => {
  await axios.delete(`/api/groups/${groupId}`);
};

// 모임 생성
export const createGroup = async (formData: FormData): Promise<number> => {
  const res = await axios.post<number>('/api/groups/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 모임 완료
export const completeGroup = async (groupId: number) => {
  await axios.post(`/api/groups/${groupId}/complete`);
};

// 모임 취소
export const cancelGroup = async (groupId: number) => {
  await axios.post(`/api/groups/${groupId}/cancel`);
};

// 모임 검색 및 조회
export const searchGroups = async (
  params: GroupSearchQueryParams,
): Promise<Group[]> => {
  const res = await axios.get<Group[]>('/api/groups/search', { params });
  return res.data;
};

// 내가 속한 모임 조회
export const getMyGroups = async (): Promise<Group[]> => {
  const res = await axios.get<Group[]>('/api/groups/getMy');
  return res.data;
};

// 내가 리더 역할인 모임 조회
export const getLeaderMyGroups = async (): Promise<Group[]> => {
  const res = await axios.get<Group[]>('/api/groups/getLeaderMy');
  return res.data;
};
