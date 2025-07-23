declare interface LeaderMyGroupData {
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
  status: string;
  latitude: number;
  longitude: number;
  during: number;
  category: string;
  leaderNickname: string;
  leaderEmail: string;
  hashTags: string[];
  activated: boolean;
}

declare interface LeaderMyGroupResponse {
  code: string;
  message: string;
  reason: string | null;
  data: LeaderMyGroupData[];
}
