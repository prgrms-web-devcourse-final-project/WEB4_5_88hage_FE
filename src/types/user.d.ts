declare interface ProfileRequest {
  image?: string; // binary
  imageChanged: boolean;
  introduction: string;
}

declare interface UserProfile {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  contentPreferences: string[];
  groupPreferences: string[];
  followerCount: number;
  followingCount: number;
}

declare interface Following {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string; // 팔로우한 시간
}

declare interface Follower {
  email: string;
  nickname: string;
  introduction: string;
  imageUrl: string;
  followedAt: string; // 팔로우된 시간
}

declare interface UserCoordinate {
  latitude: number;
  longitude: number;
}

declare interface UserInfo {
  email: string;
  nickname: string;
  address: string;
  latitude: number;
  longitude: number;
  isMarketingAgreed: boolean;
}

declare interface NicknameChangeRequest {
  nickname: string;
}

declare interface User {
  email: string;
  nickname: string;
  // ... 기타 사용자 정보 필드
}