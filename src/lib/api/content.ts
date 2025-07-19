import { get } from './fetchInstance';
import { GetContentsParams } from '@/types/content';

// 컨텐츠 목록 조회
export const getAllContents = async (params: GetContentsParams = {}) => {
  const defaultParams = {
    page: 0,
    size: 10,
    sort: ['selectedDate,DESC'], // 명세에 따라 기본 정렬 기준 추가
  };
  const mergedParams = { ...defaultParams, ...params };

  const stringifiedParams = Object.entries(mergedParams).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(','); // 배열인 경우 쉼표로 조인
      } else {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const queryString = new URLSearchParams(stringifiedParams).toString();
  return get(`/api/contents?${queryString}`);
};

// 컨텐츠 상세 조회
export const getContent = async (id: number) => {
  return get(`/api/contents/${id}`);
};
