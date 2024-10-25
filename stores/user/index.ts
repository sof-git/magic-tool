import { defineStore } from 'pinia';
import { useState } from './state';
import actions from './actions';
import getters from './getters';

export const useUsersStore = defineStore('users', {
    state: useState,
    actions,
    getters,
  });