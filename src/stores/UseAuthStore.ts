'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Buffer } from 'buffer';
import { login as apiLogin } from '@/lib/api/auth';
import { get as fetchGet, patch as fetchPatch } from '@/lib/api/fetchInstance';
import { toast } from "react-toastify";

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
  checkSession: () => Promise<void>;
  leave: () => Promise<void>;
  setNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, pw, remember) => {
        try {
          const result = await apiLogin(email, pw, remember);
          const token = result?.data?.accessToken || null;

          if (!token) {
            toast.error('로그인 실패: accessToken 없음');
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
        } catch (e) {
  const errorMsg =
    e && typeof e === "object" && "message" in e
      ? (e as Error).message
      : "";
  toast.error("로그인 실패: " + errorMsg);
  set({ token: null, user: null, isAuthenticated: false });
}
      },

      fetchCoordinate: async () => {
        const { token, user } = get();
        if (!user) return;

        interface CoordinateResponse {
          data: {
            latitude: number;
            longitude: number;
          };
        }

        try {
          const headers: Record<string, string> = {};
          if (token) headers.Authorization = `Bearer ${token}`;
          const response = await fetchGet<CoordinateResponse>(
            '/api/users/coordinate',
            { headers, credentials: 'include' }
          );
          const { latitude, longitude } = response.data;
          set((state) => ({
            user: {
              ...state.user,
              email: state.user?.email || '',
              nickname: state.user?.nickname || '',
              latitude,
              longitude,
            },
          }));
        } catch {
        }
      },

      checkSession: async () => {
        try {
          const response = await fetchGet<{ data: User }>(
            '/api/users/info',
            { credentials: 'include' }
          );
          set({
            user: response.data,
            isAuthenticated: true,
          });
          await get().fetchCoordinate();
        } catch {
          set({ token: null, user: null, isAuthenticated: false });
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("authState");
        }
      },

      leave: async () => {
        try {
          const { token } = get();
          const headers: Record<string, string> = {};
          if (token) headers.Authorization = `Bearer ${token}`;
          await fetchPatch('/api/users', {}, { headers, credentials: 'include' });
          set({ token: null, user: null, isAuthenticated: false });
          if (typeof window !== "undefined") {
            localStorage.removeItem("authState");
          }
          toast.success("회원탈퇴가 완료되었습니다.");
        } catch (e) {
  const errorMsg =
    e && typeof e === "object" && "message" in e
      ? (e as Error).message
      : "";
  toast.error("회원탈퇴 실패: " + errorMsg);
}
      },

      setNickname: (nickname: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, nickname } : null,
        }));
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