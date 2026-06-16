import { defineStore } from 'pinia'

interface Streamer {
  id: string
  name: string
  username: string
  email: string
  avatar_url?: string
  created_at?: string
}

interface AuthState {
  token: string | null
  streamer: Streamer | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    streamer: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      const cookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
      cookie.value = token
    },

    async login(email: string, password: string) {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api('/auth/login', {
        method: 'POST',
        body: { email, password },
      }) as { success: boolean; data: { token: string; streamer: Streamer } }

      if (res.success) {
        this.setToken(res.data.token)
        this.streamer = res.data.streamer
      }
      return res
    },

    async register(payload: { name: string; username: string; email: string; password: string }) {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api('/auth/register', {
        method: 'POST',
        body: payload,
      })
      return res
    },

    async fetchProfile() {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api('/streamer/me', {
        method: 'GET',
      }) as { success: boolean; data: Streamer }

      if (res.success) {
        this.streamer = res.data
      }
      return res
    },

    restoreFromCookie() {
      const cookie = useCookie('auth_token')
      if (cookie.value) {
        this.token = cookie.value
      }
    },

    logout() {
      this.token = null
      this.streamer = null
      const cookie = useCookie('auth_token')
      cookie.value = null
    },
  },
})
