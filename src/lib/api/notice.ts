import axios from './axiosInstance';

// 공지사항 생성
export const createNotice = async (data: NoticeCreateRequest) => {
  return axios.post('/notices', data);
};

// 공지사항 상세 조회
export const getNoticeById = async (id: number) => {
  const response = await axios.get(`/api/notices/${id}`);
  return response.data; // { id, message }
};

// 공지사항 목록 조회
export const getNoticeList = async () => {
  // TODO: Add pagination, filtering, etc. parameters as needed
  return axios.get<NoticeListItem[]>('/notices');
};
