import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async(to) => {
  const authStore = useAuthStore();

  const tokenLoaded = await authStore.loadToken();
  
  // Allow access to the auth page if the user is not authenticated
  if (!authStore.isAuthenticated && to.path  !== '/auth' && tokenLoaded) {
    return navigateTo('/auth'); // Redirect to auth page if not authenticated
  }

  // Optionally, redirect authenticated users away from the auth page
  if (authStore.isAuthenticated && to.path === '/auth') {
    return navigateTo('/'); // Redirect to home if already logged in
  }
});