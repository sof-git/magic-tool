import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const token = import.meta.client ? localStorage.getItem('authToken') : null;
console.log(token);
  if (token) {
    console.log('init auth token', token);
    authStore.setToken(token); // Set the token in your auth store
  }
});