import { get, post, put, del } from './fetchInstance';

// 모임 상세 조회
export const getGroupById = async (groupId: number): Promise<GroupDetail> => {
  const res = await get<ApiResponse<GroupDetail>>(`/api/groups/${groupId}`);
  return res.data;
};

// 모임 수정
export const updateGroup = async (
  groupId: number,
  data: GroupUpdateRequest,
) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('explain', data.explain);
  formData.append('simpleExplain', data.simpleExplain);
  formData.append('placeName', data.placeName);
  formData.append('groupDate', data.groupDate);
  formData.append('address', data.address);
  formData.append('category', data.category);
  formData.append('maxPeople', data.maxPeople.toString());
  formData.append('latitude', data.latitude.toString());
  formData.append('longitude', data.longitude.toString());
  if (data.image) {
    formData.append('image', data.image);
  }
  data.hashTags.forEach((tag) => formData.append('hashTags', tag));
  if (data.during) formData.append('during', data.during.toString());

  await put(`/api/groups/${groupId}`, formData);
};

// 모임 삭제
export const deleteGroup = async (groupId: number): Promise<void> => {
  const result = await del(`/api/groups/${groupId}`);
  return result;
};

// 모임 생성

export const createGroup = async (data: GroupCreateRequest) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('explain', data.explain);
  formData.append('simpleExplain', data.simpleExplain);
  formData.append('placeName', data.placeName);
  formData.append('groupDate', data.groupDate);
  formData.append('address', data.address);
  formData.append('category', data.category);
  formData.append('maxPeople', data.maxPeople.toString());
  formData.append('latitude', data.latitude.toString());
  formData.append('longitude', data.longitude.toString());
  if (data.image) {
    formData.append('image', data.image);
  }
  data.hashTags.forEach((tag) => formData.append('hashTags', tag));
  if (data.during) formData.append('during', data.during.toString());

  const res = await post<ApiResponse<Group>>('/api/groups/create', formData);
  return res.data;
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
export const getMyGroups = async (): Promise<MyGroupData[]> => {
  const res = await get<MyGroupResponse>('/api/groups/getMy');
  return res.data;
};

// 내가 리더 역할인 모임 조회
export const getLeaderMyGroups = async (): Promise<LeaderMyGroupData[]> => {
  const res = await get<GetLeaderMyGroupsResponse>('/api/groups/getLeaderMy');
  return res.data;
};

// 자동 완성을 위한 단어 저장 (모임 해시태그)
export const saveWord = async (word: string) => {
  return post('/api/group-hashtags/save', { word });
};

// 자동 완성을 위한 단어 불러오기 (모임 해시태그)
export const completeWord = async () => {
  return get('/api/group-hashtags/complete');
};
