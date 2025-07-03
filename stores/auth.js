// stores/auth.ts
import { defineStore } from 'pinia'
import { login, getUser } from '~/api/login'
import { WORDPRESS_BASE_URL } from '~/utils/staticData/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    error: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.token
    },
  },
  actions: {
    async login(username, password) {
      try {
        const data = await login(username, password)

        this.token = data.token
        this.user = await getUser(this.token)

        localStorage.setItem('jwt', data.token)
        this.error = null
        return true
      } catch (err) {
        this.error = err.message
        this.token = null
        this.user = null
        localStorage.removeItem('jwt')
        return false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null
      localStorage.removeItem('jwt')
    },

    async getUser() {
      if (this.user) {
        return this.user
      }

      try {
        const res = await getUser(this.token)
        this.user = res
        return this.user
      } catch (err) {
        console.error('Failed to fetch user', err)
        throw err
      }
    },

    loadToken() {
      const token = localStorage.getItem('jwt')
      if (token) {
        this.token = token
      }
    },
  },
})
