import { get } from './fetchInstance';

export async function getContents(params: GetContentsParams) {
  const baseUrl = '/api/contents';
  const queryParams = new URLSearchParams();

  if (params.category) queryParams.append('category', params.category);
  if (params.gugunName) queryParams.append('gugunName', params.gugunName);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);
  if (params.keyword) queryParams.append('keyword', params.keyword);
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.page !== undefined)
    queryParams.append('page', params.page.toString());
  if (params.size !== undefined)
    queryParams.append('size', params.size.toString());
  if (params.sort) {
    params.sort.forEach((s) => queryParams.append('sort', s));
  }

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw error;
  }
}

// 컨텐츠 상세 조회
export const getContent = async (id: number) => {
  return get(`/api/contents/${id}`);
};
