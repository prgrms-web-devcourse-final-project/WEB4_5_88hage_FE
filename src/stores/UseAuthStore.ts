'use client';

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import base64 from 'base-64'

interface User {
  //id: string
  email: string
  nickname: string
}

interface AuthState {
  token:string|null
  user: User | null
  isAuthenticated: boolean
  login: (email: string, pw: string, remember: boolean) => Promise<void>
  logout: () => void
}

const API = process.env.NEXT_PUBLIC_API_URL

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token:null,
      user:null,
      isAuthenticated: false,

      login: async (email, pw, remember) => {
        const {data}= await axios.post(
          `${API}api/auth/login`,
          { email, password: pw, rememberMe: remember },
          { withCredentials: true }
        )
        const token=data.data.accessToken as string
        const [,payload]=token.split('.')
        const decodePayload=JSON.parse(base64.decode(payload))

        console.log('[AuthStore] decodePayload: ', decodePayload)

        set({ 
          token,
          user:{
            email:decodePayload.sub,
            nickname: decodePayload.nickname
          },
          isAuthenticated: true })
      },
      logout: () => {
        set({
          token:null,
          user:null,
          isAuthenticated: false, })
      },
    }),
    {
      name: 'authState',
      partialize: (state) => ({
        token:state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)