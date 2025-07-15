import axios from './axiosInstance';
import type {
  EventCreateRequest,
  EventDetail,
  EventListItem,
} from '@/types/event';

// 이벤트 생성
export const createEvent = async (data: EventCreateRequest) => {
  return axios.post('/events', data);
};

// 이벤트 상세 조회
export const getEventDetail = async (eventId: string) => {
  return axios.get<EventDetail>(`/events/${eventId}`);
};

// 이벤트 목록 조회
export const getEventList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<EventListItem[]>('/events');
};
