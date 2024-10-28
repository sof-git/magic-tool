
import { defineStore } from 'pinia';
import { useState } from './state';
import actions from './actions';
import getters from './getters';

export const useHeroesStore = defineStore('heroes', {
    state: useState,
    actions,
    getters
});