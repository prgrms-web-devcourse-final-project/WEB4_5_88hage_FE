import { ProfileRequest } from '@/types/user';
import axios from 'axios';

// 프로필 수정
export const updateProfile = async (profileData: ProfileRequest) => {
  const formData = new FormData();
  if (profileData.imageChanged && profileData.image) {
    formData.append('image', profileData.image);
  }
  formData.append('imageChanged', String(profileData.imageChanged));
  formData.append('introduction', profileData.introduction);

  return axios.put('/userInfos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserDetailByEmail = async (email: string) => {
  const response = await axios.get(`/api/userInfos/${email}`);
  return response.data;
};
