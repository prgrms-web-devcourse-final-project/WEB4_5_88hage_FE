/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T> {
  code: string;
  message: string;
  reason: null;
  data: {
    content: T[];
    pageable: any;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: any[];
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}

interface NicknameVerificationResponse {
  data: string;
  code: string;
  reason: string | null;
  message: string | null;
}

interface CalendarContent {
  contentId: number;
  category: string;
  contentTitle: string;
  selectedDate: string;
}

interface Follower {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string;
}

interface Following {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string;
}

interface ServiceResponse<T> {
  code: string;
  message: string;
  reason: null;
  data: T;
}

interface CurrentUserInfo {
  email: string;
  // Add other properties if they are part of the user info response
}

interface GroupStat {
  category: string;
  count: number;
}

interface DailyCalendar {
  calendarId: number;
  type: string;
  activityId: number;
  title: string;
  selectedDate: string;
  address: string;
}
