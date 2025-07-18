import axios from './axiosInstance';
import { CalendarContentRequest } from '@/types/event';

// 캘린더 일정 등록 - 예약하기
export const addCalendar = async (data: CalendarContentRequest) => {
  return axios.post('/api/calendars', data);
};

// 캘린더 일정 삭제
export const deleteCalendar = async (calendarId: number) => {
  return axios.delete(`/api/calendars/${calendarId}`);
};

// 캘린더 일정 수정 - 시간
export const updateCalendar = async (
  calendarId: number,
  selectedDate: string,
) => {
  return axios.patch(`/api/calendars/${calendarId}`, selectedDate);
};

// 월별 일정 조회
export const getMonthlyCalendar = async (year: number, month: number) => {
  return axios.get(`/api/calendars/monthly`, { params: { year, month } });
};

// 일별 일정 조회
export const getDailyCalendar = async (
  year: number,
  month: number,
  day: number,
) => {
  return axios.get(`/api/calendars/daily`, { params: { year, month, day } });
};

// 컨텐츠 일별 일정 조회
export const getDailyCalendarForContent = async (date: string) => {
  return axios.get(`/api/calendars/daily/content`, { params: { date } });
};

// 일정 등록한 컨텐츠 목록 조회
export const getCalendarForContent = async (params?: {
  pastIncluded?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}) => {
  const defaultParams = {
    pastIncluded: true,
    page: 0,
    size: 10,
    sort: ['selectedDate,DESC'],
  };
  const mergedParams = { ...defaultParams, ...params };
  return axios.get(`/api/calendars/content`, { params: mergedParams });
};
