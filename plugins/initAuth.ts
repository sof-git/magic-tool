import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  authStore.loadToken(); // Load token when the app starts
});