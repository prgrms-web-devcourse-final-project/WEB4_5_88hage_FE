import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SignupStore {
  userData: SignupUserData | null;
  isVerified: boolean;
  setData: (data: SignupUserData) => void;
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
