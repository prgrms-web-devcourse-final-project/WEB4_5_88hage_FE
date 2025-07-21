'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Buffer } from 'buffer';
import { login as apiLogin } from '@/lib/api/auth';
import axios from 'axios';

interface User {
  email: string;
  nickname: string;
  latitude?: number;
  longitude?: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pw: string, remember: boolean) => Promise<void>;
  fetchCoordinate: () => Promise<void>;
  logout: () => void;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email, pw, remember) => {
        const result = await apiLogin(email, pw, remember);
        console.log('apiLogin 응답:', result);

        // accessToken 안전하게 파싱
        const token =
          result?.data?.data?.accessToken ||
          result?.data?.accessToken ||
          result?.accessToken ||
          null;

        if (!token) {
          alert('로그인 실패: accessToken 없음');
          return;
        }

        const [, payload] = token.split('.');
        const padded = payload
          .replace(/-/g, '+')
          .replace(/_/g, '/')
          .padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=');
        const raw = Buffer.from(padded, 'base64').toString('utf8');
        const { sub, nickname } = JSON.parse(raw);

        set({
          token,
          user: { email: sub, nickname },
          isAuthenticated: true,
        });
        await get().fetchCoordinate();
      },

      fetchCoordinate: async () => {
        const { token, user } = get();
        if (!token || !user) return;
        const { data } = await axios.get(`${API}/users/coordinate`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const { latitude, longitude } = data.data;
        set((state) => ({
          user: {
            ...state.user,
            latitude,
            longitude,
          },
        }));
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'authState',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);