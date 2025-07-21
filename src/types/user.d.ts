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
export interface UserHashtag {
  id: number;
  info_id: string | null;
  tag: string | null;
}
export interface UserInfo {
  activated: boolean;
  created_at: string;
  modified_at: string;
  email: string;
  image_url: string | null;
  introduction: string | null;
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

export interface UserPreference {
  id: number;
  activated: boolean;
  created_at: string;
  modified_at: string;
  category: string;
  user_id: string;
}

export interface NicknameChangeRequest {
  nickname: string;
}

export interface User {
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
