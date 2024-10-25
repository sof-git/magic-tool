/**
 * @file Getters Users Store - Getters for Users Store
 * @description This file contains the getters for the users store. Getters are used to retrieve data from the store.
 * @exports getUsers
 * @exports getUserById
 * @exports getUserByLogin
 */
import type { IUserState } from './state';
import type { IUser } from '@/types/user';

export default {
    getUsers(state: IUserState): IUser[] {
        return state.users;
    }
};