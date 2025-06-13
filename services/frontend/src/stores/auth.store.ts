import { defineStore } from 'pinia';

export interface AuthUser {
  id: string;
  name: string;
}

export interface AuthStoreState {
  token: string;
  user: AuthUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    token: '',
    user: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: AuthUser) {
      this.user = user;
    },
    logout() {
      this.token = '';
      this.user = null;
    },
  },
});

export type AuthStore = ReturnType<typeof useAuthStore>;
