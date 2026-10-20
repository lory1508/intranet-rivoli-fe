export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchUser() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await $fetch("/api/auth/me");

        this.user = response.user;
        this.isAuthenticated = response.authenticated;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      } finally {
        this.isLoading = false;
      }
    },

    async login(username, password) {
      this.isLoading = true;

      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { username, password },
        });

        this.user = response.user;
        this.isAuthenticated = true;
        this.error = null;
        return true;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;

        this.error =
          error.data?.statusMessage ||
          "Si è verificato un errore durante il login.";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      await $fetch("/api/auth/logout", { method: "POST" });

      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
