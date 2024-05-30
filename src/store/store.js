import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        userData: {}
    }),
    getters: {
      getState: (state) => state,
    },
    actions: {
      clear() {
        this.userData = null;
      },
      update(data) {
        console.log("at store's update func", data);
        this.userData = data;
      },
    },
});
