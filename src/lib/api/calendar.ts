// import { CalendarContentRequest } from '@/types/global';
import { ApiResponse, CalendarContent, DailyCalendar, ServiceResponse } from '@/types/api';
import { get, post, del, patch } from './fetchInstance';

// 캘린더 일정 등록 - 예약하기
export const addCalendar = async (data: AddCalendar) => {
  return post('/api/calendars', data);
};

// 캘린더 일정 삭제
export const deleteCalendar = async (calendarId: number) => {
  await del(`/api/calendars/${calendarId}`);
};

// 캘린더 일정 수정 - 시간
export const updateCalendar = async (
  calendarId: number,
  selectedDate: string,
) => {
  return patch(`/api/calendars/${calendarId}`, { selectedDate });
};

// 월별 일정 조회
export const getMonthlyCalendar = async (year: number, month: number) => {
  return get(`/api/calendars/monthly?year=${year}&month=${month}`);
};

// 일별 일정 조회
export const getDailyCalendar = async (
  year: number,
  month: number,
  day: number,
): Promise<ServiceResponse<DailyCalendar[]>> => {
  return get<ServiceResponse<DailyCalendar[]>>(
    `/api/calendars/daily?year=${year}&month=${month}&day=${day}`,
  );
};

// 컨텐츠 일별 일정 조회
export const getDailyCalendarForContent = async (date: string) => {
  return get(`/api/calendars/daily/content?date=${date}`);
};

// 일정 등록한 컨텐츠 목록 조회
export const getCalendarForContent = async (params?: {
  pastIncluded: boolean;
  page: number;
  size: number;
  sort: string[];
}): Promise<ApiResponse<CalendarContent>> => {
  const defaultParams = {
    pastIncluded: true,
    page: 0,
    size: 10,
    sort: ['selectedDate,DESC'],
  };
  const mergedParams = { ...defaultParams, ...params };
  const stringifiedParams = Object.entries(mergedParams).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>,
  );
  const queryString = new URLSearchParams(stringifiedParams).toString();
  return get(`/api/calendars/content?${queryString}`);
};
