import { create } from 'zustand';

type NewUserData = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  address: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  isMarketingAgreed: boolean;
};

interface SignupStore {
  userData: NewUserData | null;
  code: string;
  setData: (data: NewUserData) => void;
  clearData: () => void;
  setCode: (code: string) => void;
  clearCode: () => void;
  clearAll: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userData: null,
  code: '',
  setData: (data) => set({ userData: data }),
  clearData: () => set({ userData: null }),
  setCode: (code) => set({ code: code }),
  clearCode: () => set({ code: '' }),
  clearAll: () => set({ userData: null, code: '' }),
}));
