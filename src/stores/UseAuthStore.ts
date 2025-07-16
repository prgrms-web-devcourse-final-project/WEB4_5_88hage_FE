import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface User {
  id: string
  email: string
  nickname: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pw: string, remember: boolean) => Promise<void>
  logout: () => void
}

const API = process.env.NEXT_PUBLIC_API_URL

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: async (email, pw, remember) => {
        await axios.post(
          `${API}auth/login`,
          { email, password: pw, rememberMe: remember },
          { withCredentials: true }
        )
        set({ isAuthenticated: true })
      },

      logout: () => {
        set({ isAuthenticated: false, })
      },
    }),
    {
      name: 'authState',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)