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
    token: null,
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
        return navigateTo('/');
        //route to /
        
      }
    },
  },
});