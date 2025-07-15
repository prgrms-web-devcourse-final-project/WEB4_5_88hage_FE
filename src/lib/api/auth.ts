import axios from './axiosInstance';

export const loginUser = async (
  email: string,
  password: string,
  rememberMe = false,
) => {
  return axios.post(
    '/auth/login',
    { email, password, rememberMe },
    { withCredentials: true },
  );
};
