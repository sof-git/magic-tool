import type { IUser } from '@/types/user';
import { useAuthStore } from '@/stores/auth';
import type {IUserState} from './state';

/**
 * User actions
 * 
 * @description This file contains actions for the user store, such as fetching user data from the server.
 */

export default {
    /**
     * Fetches user data from the server.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    async fetchUsers(this: IUserState) {
        const authStore = useAuthStore();
        const isAuth = authStore.isAuthenticated;
        if (!isAuth) {
            return;
        } else {
            const response:any = await $fetch('http://localhost:3000/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`,
                },
            });
            if(response.error) {
                throw new Error(response.error);
            } else {
                this.users = response;
                return response;
            }
        }
    },
    /**
    *Creates a new user.
    * @param {IUser} user - The user data.
    * @returns {Promise<void>} A promise that resolves when the user is created.
     */

    async createUser(this: IUserState, user: IUser) {
        try {
            let statusCode: number | null = null;
            const response: any = await $fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: user,
                onResponse({ response }) {
                    statusCode = response.status; // Capture the status code
                },
            });
            if(response.error) {
                throw new Error(response.error);
            } else {
                this.users.push(response);
                return {response, statusCode};
            }
        } catch (error: any) {
            return error;
        }
    }
}
