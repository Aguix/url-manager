import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        isConnected: false,
        loading: true
    }),

    actions: {        
        async fetchUser() {
            this.loading = true
            try {
                const user = await $fetch<User>('/api/me')
                this.user = user
                this.isConnected = true
            } catch {
                this.user = null
                this.isConnected = false
            } finally {
                this.loading = false
            }
        },

        async logout() {
            await $fetch('/api/logout', { method: 'POST' })
            this.user = null
            this.isConnected = false
        }


    }
})
