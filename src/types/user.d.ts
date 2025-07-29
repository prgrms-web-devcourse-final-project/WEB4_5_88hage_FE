declare interface ProfileRequest {
  image?: File | null;
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
declare interface UserHashtag {
  id: number;
  info_id: string | null;
  tag: string | null;
}
declare interface UserInfo {
  activated: boolean;
  created_at: string;
  modified_at: string;
  email: string;
  image_url: string | null;
  introduction: string | null;
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

declare interface UserPreference {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  category: string;
  user_id: string;
}

declare interface NicknameChangeRequest {
  nickname: string;
}

declare interface User {
  activated: boolean;
  due_date: string | null;
  is_marketing_agreed: boolean;
  is_verified: boolean;
  latitude: number | null;
  longitude: number | null;
  suspend_duration: number | null;
  created_at: string;
  modified_at: string;
  address: string | null;
  birth_date: string | null;
  due_reason: string | null;
  email: string;
  gender: 'MALE' | 'FEMALE' | null;
  info_id: string | null;
  nickname: string | null;
  password: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_GUEST';
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
}
