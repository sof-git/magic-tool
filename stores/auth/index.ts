import { defineStore } from "pinia";
import {jwtDecode}  from "jwt-decode";
import type { ICredentials } from "~/types/user";

interface DecodedToken {
  exp: number; // Token expiration time in seconds since Unix epoch
}

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
    token: null as string | null,
    tokenExpirationTimer: null as number | null, // Timer for token expiration
    
  }),

  getters: {
    /**
     * Checks if a user is authenticated by verifying the presence of the token.
     * 
     * @returns {boolean} True if the user is authenticated, otherwise false.
     */
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    loadToken(): Promise<void> {
      return new Promise((resolve) => {
        if (import.meta.client) {
          const savedToken = localStorage.getItem('authToken');
          if (savedToken) {
            this.token = savedToken;
          }
        }
        resolve();
      });
    },

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
          this.startTokenExpirationCheck(); // Start token expiration check
        }
    },

    /**
     * Logs out the current user by clearing the token.
     */
    logout() {
      this.token = null;
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
      localStorage.removeItem('authToken');
      return navigateTo('/auth');
    },
    startTokenExpirationCheck() {
      if (!this.token) return;

      const decoded: DecodedToken = jwtDecode(this.token);
      const expiresIn = decoded.exp * 1000 - Date.now();

      if (expiresIn <= 0) {
        this.logout();
      } else {
        this.tokenExpirationTimer = window.setTimeout(() => {
          this.logout();
        }, expiresIn);
      }
    },
  },
});