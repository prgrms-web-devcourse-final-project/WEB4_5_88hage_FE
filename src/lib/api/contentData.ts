import axios from './axiosInstance';

// 전체 콘텐츠 좌표 업데이트
export const updateAllCoordinates = async () => {
  return axios.post('/api/content-data/update');
};

// 키워드 → 위경도 조회
export const testKeywordToCoordinates = async (keyword: string) => {
  return axios.post('/api/content-data/keyword-coordinates', { keyword });
};

// 위경도 → 주소 조회
export const testCoordinesToAddress = async (
  latitude: number,
  longitude: number,
) => {
  return axios.post('/api/content-data/coordinates-address', {
    latitude,
    longitude,
  });
};

// 전체 프로세스 테스트 (키워드 → 위경도 → 주소)
export const testFullProcess = async (keyword: string) => {
  return axios.get('/api/content-data/full-process', { params: { keyword } });
};
