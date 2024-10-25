import { defineStore } from "#imports";
import type { ICredentials } from "~/types/user";

/**
 * Auth store
 * 
 * @description This store manages the authentication state of the application, including user data and token management. 
 * It provides methods for logging in and checking authentication status.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    /**
     * @property {string|null} token - Stores the JWT token for the authenticated user, or null if not logged in.
     */
    token: ref<string | null>(null),
  }),

  getters: {
    /**
     * Checks if a user is authenticated by verifying the presence of user data.
     * 
     * @returns {boolean} True if the user is authenticated, otherwise false.
     */
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    /**
     * Logs in a user by sending credentials to the server.
     * 
     * @param {ICredentials} credentials - The username and password.
     * 
     * @returns {Promise<Object>} The server response containing user data and token.
     */
    async login(credentials:ICredentials):Promise<any> {
      // Sends login request to the server
      const response:any = await $fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.username,  // send only username
            password: credentials.password,  // send only password
          }),      
      });
      if(response.error) {
        throw new Error(response.error);
      } else {
        this.token = response.access_token
        if (import.meta.client) {
          localStorage.setItem('authToken', response.access_token); // Only save on client-side
        }
        return navigateTo('/');
        //route to /
        
      }
    },

    /**
     * Sets the token in the store state.
     * 
     * @param {string} token - The JWT token to set.
     */

    setToken(token:string) {
        this.token = token;
        if (import.meta.client) {
          localStorage.setItem('authToken', token); // Only save on client-side
        }// Only save on client-side
    },

    /**
     * Logs out the current user by clearing the token.
     */
    logout() {
      this.token = null;
      return navigateTo('/auth');
    }
  },
});