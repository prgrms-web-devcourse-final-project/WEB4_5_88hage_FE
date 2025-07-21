import { get, post } from './fetchInstance';

// 전체 콘텐츠 좌표 업데이트
export const updateAllCoordinates = async () => {
  return post('/api/content-data/update', null);
};

// 키워드 → 위경도 조회
export const testKeywordToCoordinates = async (keyword: string) => {
  return post('/api/content-data/keyword-coordinates', { keyword });
};

// 위경도 → 주소 조회
export const testCoordinesToAddress = async (
  latitude: number,
  longitude: number,
) => {
  return post('/api/content-data/coordinates-address', {
    latitude,
    longitude,
  });
};

// 전체 프로세스 테스트 (키워드 → 위경도 → 주소)
export const testFullProcess = async (keyword: string) => {
  return get(`/api/content-data/full-process?keyword=${keyword}`);
};
