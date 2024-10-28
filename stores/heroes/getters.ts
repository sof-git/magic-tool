/**
 * @file getters Heroes Store - Getters for Heroes Store
 * @description This file contains the getters for the heroes store. Getters are used to retrieve data from the store.
 * @exports getHeroes
 * @exports getHeroById
 * @exports getHeroByType
 */

import type { IHeroState } from './state';
import type { IHero } from '@/types/heroes';

export default {
    getHeroes(state: IHeroState): IHero[] {
        return state.heroes;
    },
    getHeroById(state: IHeroState) {
        return (id: string) => state.heroes.find((hero) => hero.id === id);
    },
    getHeroByType(state: IHeroState) {
        return (type: string) => state.heroes.filter((hero) => hero.type === type);
    },
};