import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NewUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  latitude: number; // 위도
  longitude: number; // 경도
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
};

interface SignupStore {
  userData: NewUserData | null;
  isVerified: boolean;
  setData: (data: NewUserData) => void;
  clearData: () => void;
  setVerified: (data: boolean) => void;
  clearAll: () => void;
}

export const useSignupStore = create(
  persist<SignupStore>(
    (set) => ({
      userData: null,
      isVerified: false,
      setData: (data) => set({ userData: data }),
      clearData: () => set({ userData: null }),
      setVerified: (data) => set({ isVerified: data }),
      clearAll: () => set({ userData: null, isVerified: false }),
    }),
    {
      name: 'signup-store',
    },
  ),
);
