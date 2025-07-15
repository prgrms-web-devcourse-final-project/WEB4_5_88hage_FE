import axiosInstance from './axiosInstance';
import type { ProfileRequest, UserInfoRequest } from '@/types/user';

// 회원 정보 조회
export const getUserInfo = async () => {
  return axiosInstance.get('/users/info');
};

// 회원 정보 수정
export const updateUserInfo = async (userInfo: UserInfoRequest) => {
  return axiosInstance.put('/users/info', userInfo);
};

// 프로필 수정
export const updateProfile = async (profileData: ProfileRequest) => {
  const formData = new FormData();
  formData.append('image', profileData.image);
  formData.append('imageChanged', String(profileData.imageChanged));
  formData.append('introduction', profileData.introduction);
  profileData.hashTags.forEach((tag) => {
    formData.append('hashTags', tag);
  });

  return axiosInstance.put('/userInfos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
