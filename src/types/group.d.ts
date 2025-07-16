export interface Group {
  id: number;
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string; // ISO 형식
  address: string;
  category: string;
  maxPeople?: number;
  latitude: number;
  longitude: number;
  imageUrl?: string; // 응답 시 포함될 수 있음
  hashTags: string[];
  during?: number;
  hostEmail?: string; // 모임 주최자
  members?: string[]; // 선택적 응답 필드
}
export type GroupCategory =
  | 'ART'
  | 'TRAVEL'
  | 'FOOD'
  | 'GAME'
  | 'CULTURE'
  | 'SPORT'
  | 'STUDY'
  | 'MOVIE';

export type GroupSortType = 'recent' | 'viewCount' | 'distance';

export interface GroupSearchQueryParams {
  category?: GroupCategory;
  keyword?: string | null;
  sortBy?: GroupSortType;
  distance?: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface GroupHashtag {
  id: number;
  tag: string;
  group: number;
}
