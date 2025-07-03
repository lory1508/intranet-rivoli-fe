// stores/auth.ts
import { defineStore } from 'pinia'
import { login, getUser } from '~/api/login'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const data = await login(username, password)

        console.log(data)
        this.token = data.token
        console.log('token: ', this.token)
        this.user = await getUser(this.token)
        console.log('user: ', this.user)

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

    loadToken() {
      const token = localStorage.getItem('jwt')
      if (token) {
        this.token = token
      }
    },
  },
})
