export interface ProfileRequest {
  image?: string; // binary
  imageChanged: boolean;
  introduction: string;
}

export interface UserProfile {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  contentPreferences: string[];
  groupPreferences: string[];
  followerCount: number;
  followingCount: number;
}

export interface Following {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string; // 팔로우한 시간
}

export interface Follower {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string; // 팔로우된 시간
}

export interface UserCoordinate {
  latitude: number;
  longitude: number;
}

export interface UserInfo {
  email: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  isMarketingAgreed: boolean;
}

export interface NicknameChangeRequest {
  nickname: string;
}

export interface User {
  email: string;
  nickname: string;
  // ... 기타 사용자 정보 필드
}