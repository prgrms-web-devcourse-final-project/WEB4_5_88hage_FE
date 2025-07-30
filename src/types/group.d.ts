declare interface Group {
  id: number;
  activated?: boolean;
  during?: number;
  latitude?: number;
  longitude?: number;
  max_people?: number;
  now_people?: number;
  view_count?: number;
  created_at?: string;
  group_date?: string;
  modified_at?: string;
  address?: string;
  category?:
    | 'ART'
    | 'TRAVEL'
    | 'FOOD'
    | 'GAME'
    | 'CULTURE'
    | 'SPORT'
    | 'STUDY'
    | 'MOVIE';
  explain?: string;
  image_url?: string;
  leader_id: string;
  place_name?: string;
  simple_explain?: string;
  status?: 'RECRUITING' | 'FULL' | 'COMPLETED' | 'CANCELED' | 'DELETE';
  title?: string;
}

declare interface GroupDetail {
  id: number;
  title: string;
  explain: string;
  simpleExplain: string;
  imageUrl: string;
  placeName: string;
  address: string;
  viewCount: number;
  groupDate: string; // ISO string
  createdAt: string;
  maxPeople: number;
  nowPeople: number;
  status: 'RECRUITING' | 'CLOSED' | string;
  latitude: number;
  longitude: number;
  during: number; // 단위: 시간
  category: string; // e.g. 'STUDY', 'SPORT', 'MUSIC'
  leaderNickname: string;
  leaderEmail: string;
  leaderExplain: string;
  leaderImgUrl: string;
  leaderHashTags: string[];
  hashTags: string[];
  activated: boolean;
  relatedGroups: RelatedGroup[];
  isLeader?: boolean;
  type?: string;
  currentUserImageUrl?: string;
}

declare interface RelatedGroup {
  id: number;
  title: string;
  explain: string;
  simpleExplain: string;
  imageUrl: string;
  placeName: string;
  address: string;
  viewCount: number;
  groupDate: string;
  createdAt: string;
  maxPeople: number;
  nowPeople: number;
  status: 'RECRUITING' | 'CLOSED' | string;
  latitude: number;
  longitude: number;
  during: number;
  category: string;
  leaderNickname: string;
  leaderEmail: string;
  leaderExplain: string;
  leaderImgUrl: string;
  leaderHashTags: string[];
  hashTags: string[];
  activated: boolean;
  relatedGroups: null;
}

declare interface GroupUpdateRequest {
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
  image?: File | null;
  hashTags: string[];
  during?: number;
}

declare interface GroupSearchQueryParams {
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

declare interface GroupCreateRequest {
  title: string;
  explain: string;
  simpleExplain: string;
  placeName: string;
  groupDate: string;
  address: string;
  // category:
  //   | 'ART'
  //   | 'TRAVEL'
  //   | 'FOOD'
  //   | 'GAME'
  //   | 'CULTURE'
  //   | 'SPORT'
  //   | 'STUDY'
  //   | 'MOVIE';
  category: string;
  maxPeople: number;
  latitude: number;
  longitude: number;
  image?: File | null;
  hashTags: string[];
  during?: number;
}

declare interface GroupBookmark {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  email: string;
}

declare interface GroupMember {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  email: string;
}

declare interface GroupHashtag {
  id: number;
  activated: boolean;
  created_at: string;
  group_id: number;
  modified_at: string;
  tag: string;
}

declare interface GroupPreference {
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

interface LeaderGroup {
  groupId: number;
  groupTitle: string;
  explain: string;
  simpleExplain: string;
  groupImageUrl: string;
  groupDate: string;
  groupStatus: 'RECRUITING' | 'COMPLETED' | 'IN_PROGRESS'; // Assuming these are the possible statuses
  category: 'FOOD' | 'TRAVEL' | string; // Assuming these are some categories, and allowing for others
}

interface GetLeaderMyGroupsResponse {
  code: string;
  message: string;
  reason: string | null;
  data: LeaderGroup[];
}

declare interface MyGroupData {
  groupId: number;
  groupTitle: string;
  groupLeaderEmail: string;
  groupImageUrl: string;
  currentUserEmail: string;
  currentUserImageUrl: string;
  currentUserNickname: string;
  participantCount: number;
  status: string;
  type: string;
}

// declare interface MyGroupResponse extends ApiResponse<MyGroupData[]> {}
