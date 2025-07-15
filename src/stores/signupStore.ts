import { userData } from '@/types/auth';
import { create } from 'zustand';

interface SignupStore {
  userData: userData | null;
  code: string;
  setData: (data: userData) => void;
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
