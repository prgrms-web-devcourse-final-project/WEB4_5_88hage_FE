export interface Group {
  id: number;
  activated: boolean;
  during: number;
  latitude: number;
  longitude: number;
  max_people: number;
  now_people: number;
  view_count: number;
  created_at: string;
  group_date: string;
  modified_at: string;
  address: string;
  category:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  explain: string;
  image_url: string;
  leader_id: string;
  place_name: string;
  simple_explain: string;
  status: 'RECRUITING' | 'FULL' | 'COMPLETED' | 'CANCELED' | 'DELETE';
  title: string;
}
export interface GroupUpdateRequest {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  maxPeople: number;
  latitude: number;
  longitude: number;
  image?: File;
  hashTags: string[];
  during?: number;
}
export interface GroupSearchQueryParams {
  category?:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  keyword?: string;
  sortBy?: 'recent' | 'viewCount' | 'distance';
  page?: number;
  size?: number;
  sort?: string[];
}

export interface GroupCreateRequest {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  category:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  maxPeople: number;
  latitude: number;
  longitude: number;
  image?: File;
  hashTags: string[];
  during?: number;
}

export interface GroupBookmark {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  email: string;
}

export interface GroupMember {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  email: string;
}

export interface GroupHashtag {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  tag: string;
}

export interface GroupPreference {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  category:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  user_id: string;
}
