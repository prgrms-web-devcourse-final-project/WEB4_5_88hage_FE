'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { Buffer } from 'buffer'

interface User {
  email: string
  nickname: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pw: string, remember: boolean) => Promise<void>
  logout: () => void
}

const API = process.env.NEXT_PUBLIC_API_URL

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, pw, remember) => {
        const { data } = await axios.post(
          `${API}api/auth/login`,
          { email, password: pw, rememberMe: remember },
          { withCredentials: true }
        )
        const token = data.data.accessToken as string
        console.log('[AuthStore] received token:', token)

        const [, payload] = token.split('.')
        const padded = payload
          .replace(/-/g, '+')
          .replace(/_/g, '/')
          .padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=')
        console.log('[AuthStore] base64 payload:', padded)

        const raw = Buffer.from(padded, 'base64').toString('utf8')
        console.log('[AuthStore] decoded raw JSON:', raw)

        const { sub, nickname } = JSON.parse(raw)
        console.log('[AuthStore] parsed payload:', { sub, nickname })

        set({
          token,
          user: { email: sub, nickname },
          isAuthenticated: true,
        })
      },

      logout: () => {
        console.log('[AuthStore] logout')
        set({ token: null, user: null, isAuthenticated: false })
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
)