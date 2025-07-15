import axios from './axiosInstance';
import type {
  GatheringCreateRequest,
  GatheringDetail,
  GatheringListItem,
} from '@/types/gathering';

// 모임 생성
export const createGathering = async (data: GatheringCreateRequest) => {
  return axios.post('/gatherings', data);
};

// 모임 상세 조회
export const getGatheringDetail = async (gatheringId: string) => {
  return axios.get<GatheringDetail>(`/gatherings/${gatheringId}`);
};

// 모임 목록 조회
export const getGatheringList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<GatheringListItem[]>('/gatherings');
};
