import { get, post, put, del } from './fetchInstance';

//새로운 콘텐츠 카테고리 등록
export const createContentCategory = async (
  data: ContentCategory,
): Promise<ContentCategory> => {
  const response = await post<ContentCategory>('/api/contentCategories', data);
  return response;
};

// 모든 카테고리 조회
export const getContentCategories = async (): Promise<ContentCategory[]> => {
  const response = await get<ContentCategory[]>('/api/contentCategories');
  return response;
};

// 콘텐츠 카테고리 ID조회 삭제
export const deleteContentCategory = async (id: number): Promise<void> => {
  await del(`/api/contentCategories/${id}`);
};

// 특정 콘텐츠 카테고리 수정
export const updateContentCategory = async (
  id: number,
  data: Omit<ContentCategory, 'id'>, // id는 URL에 있으므로 body에서는 제외 가능
): Promise<ContentCategory> => {
  const response = await put<ContentCategory>(
    `/api/contentCategories/${id}`,
    data,
  );
  return response;
};

// 특정 콘텐츠 카테고리 상세 정보 조회
export const getContentCategoryById = async (
  id: number,
): Promise<ContentCategory> => {
  const response = await get<ContentCategory>(`/api/contentCategories/${id}`);
  return response;
};
