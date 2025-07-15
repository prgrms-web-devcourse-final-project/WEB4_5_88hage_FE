export interface ProfileRequest {
  image: File;
  imageChanged: boolean;
  introduction: string;
  hashTags: string[];
}

export interface UserInfoRequest {
  nickname: string;
  // 유저인포 필드 정리 필요
}
