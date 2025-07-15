import axios from './axiosInstance';

export const login = async (
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
