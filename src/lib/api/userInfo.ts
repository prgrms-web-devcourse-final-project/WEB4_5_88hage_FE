import { get, put } from './fetchInstance';
// 프로필 수정
export const updateProfile = async (profileData: ProfileRequest) => {
  const formData = new FormData();
  if (profileData.imageChanged && profileData.image) {
    formData.append('image', profileData.image);
  }
  formData.append('imageChanged', String(profileData.imageChanged));
  formData.append('introduction', profileData.introduction);

  return put('/api/userInfos', formData);
};

export const getUserDetailByEmail = async (email: string) => {
  const response = await get(`/api/userInfos/${email}`);
  return response;
};
