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

export interface GroupRequest {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category: string;
  maxPeople: number;
  latitude: number;
  longitude: number;
  image?: string; // binary
  hashTags: string[];
  during: number;
}

export interface GroupHashtagDTO {
  id: number;
  tag: string;
  group: number;
}

export interface GroupBookmarkDTO {
  id: number;
  email: string;
  group: number;
}

export interface Group {
  id: number;
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category: GroupCategory;
  maxPeople: number;
  latitude: number;
  longitude: number;
  image?: string;
  hashTags: GroupHashtag[];
  during: number;
  leaderId: number;
  currentPeople: number;
  viewCount: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELED';
}
