import { GroupBookmark } from '@/types/global';
import axios from './axiosInstance';

// 사용자가 북마크한 모임 목록 조회
export const getGroupBookmarks = async (): Promise<GroupBookmark[]> => {
  const response = await axios.get<GroupBookmark[]>('/api/groupBookmarks');
  return response.data;
};

// 특정 모임 즐겨찾기에 추가
export const addGroupBookmark = async (groupId: number): Promise<void> => {
  await axios.post(`/api/groupBookmarks/${groupId}`);
};

// 선택한 모임 즐겨찾기에서 삭제
export const removeGroupBookmark = async (groupId: number): Promise<void> => {
  await axios.delete(`/api/groupBookmarks/${groupId}`);
};

// 내 즐겨찾기한 모임 내용 조회
export const getMyGroupBookmarks = async (): Promise<GroupBookmark[]> => {
  const response = await axios.get<GroupBookmark[]>(
    '/api/groupBookmarks/getBookMarks',
  );
  return response.data;
};
