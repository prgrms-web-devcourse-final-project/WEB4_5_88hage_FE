import { Group, GroupHashtag, GroupSearchQueryParams, GroupRequest } from '@/types/group';
import axios from './axiosInstance';

// 모임 상세 조회
export const getGroupById = async (groupId: number): Promise<Group> => {
  const res = await axios.get<Group>(`/api/groups/${groupId}`);
  return res.data;
};

// 모임 수정
export const updateGroup = async (groupId: number, data: GroupRequest) => {
  await axios.put(`/api/groups/${groupId}`, data);
};

// 모임 삭제
export const deleteGroup = async (groupId: number): Promise<void> => {
  await axios.delete(`/api/groups/${groupId}`);
};

// 모임 생성
export const createGroup = async (data: GroupRequest): Promise<number> => {
  const res = await axios.post<number>('/api/groups/create', data);
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
// 이 API코드 잘 작동하는 지 꼭 확인!

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

// 모임에 해시태그 추가
export const createGroupHashtag = async (data: GroupHashtag): Promise<GroupHashtag> => {
  const res = await axios.post<GroupHashtag>('/api/groupHashtags', data);
  return res.data;
};

// 모든 해시태그 목록 조회
export const getAllGroupHashtags = async (): Promise<GroupHashtag[]> => {
  const res = await axios.get('/api/groupHashtags');
  return res.data;
};

// 해시태그 삭제
export const deleteGroupHashtag = async (id: number): Promise<void> => {
  await axios.delete(`/api/groupHashtags/${id}`);
};

// 특정 모임 해시태그 정보 수정
export const updateGroupHashtag = async (
  id: number,
  data: GroupHashtag,
): Promise<GroupHashtag> => {
  const response = await axios.put(`/api/groupHashtags/${id}`, data);
  return response.data;
};

// 특정 모임 해시태그 조회
export const getGroupHashtagById = async (
  id: number,
): Promise<GroupHashtag> => {
  const response = await axios.get(`/api/groupHashtags/${id}`);
  return response.data;
};

// 자동 완성을 위한 단어 저장 (모임 해시태그)
export const saveWord = async (word: string) => {
  return axios.post('/api/groupHashtags/save', { word });
};

// 자동 완성을 위한 단어 불러오기 (모임 해시태그)
export const completeWord = async () => {
  return axios.get('/api/groupHashtags/complete');
};
