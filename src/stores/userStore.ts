import { defineStore } from 'pinia'
import { login } from '../api/auth'
import { LoginRequest } from '../types/authTypes'
import { LoginResponse } from '../types/authTypes'

interface UserState {
  token: string | null
  email: string | null
  name: string | null
  guid: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    email: null,
    name: null,
    guid: null,
  }),
  actions: {
    async loginUser(credentials: LoginRequest) {
      const response: LoginResponse = await login(credentials)
      if (!response && !response.token) {
        throw new Error('Token não encontrado')
      }

      this.token = response.token
      this.email = response.email
      this.name = response.name
      this.guid = response.guid

      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('guid', response.guid)
    },
    logoutUser() {
      this.token = null
      this.email = null
      this.name = null
      this.guid = null

      // Remove o token do localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('guid')
    },
  },
})
