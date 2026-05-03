import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    login(userData) {
      this.user = userData;
    },
    
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
