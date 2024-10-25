/**
* @file state.ts 
* @description This file contains the initial state of the users store.
* @exports useState
* @exports IUserState
 */

import type { IUser } from '@/types/user';

export function useState() {
  return {
    users: [] as IUser[]
  };
}

export type IUserState = ReturnType<typeof useState>;