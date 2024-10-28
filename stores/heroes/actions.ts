import type { IHero } from '@/types/heroes';
import type { IHeroState } from './state';
import { useAuthStore } from '../auth';
/**
 * @file actions.ts
 * @description This file contains the actions for the heroes store.
 * @exports fetchHeroes
 * @exports createHero
 * @exports updateHero
 * @exports deleteHero
 */

export default {

    /**
     * Fetches heroes data from the server.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     * @throws {Error} An error if the request fails.
     */
    async fetchHeroes(this: IHeroState) {
    const authStore = useAuthStore();

        const response: any = await $fetch('http://localhost:3000/heroes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
        });
        if(response.error) {
            throw new Error(response.error);
        } else {
            this.heroes = response;
            return response;
        }
    },

    /**
     * Creates a new hero.
     * @param {IHero} hero - The hero data.
     * @returns {Promise<void>} A promise that resolves when the hero is created.
     * @throws {Error} An error if the request fails.
     */
    async createHero(this: IHeroState, hero: IHero) {
    const authStore = useAuthStore();

        const response: any = await $fetch('http://localhost:3000/heroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
            body: hero,
        });
        if(response.error) {
            throw new Error(response.error);
        } else {
            this.heroes.push(response);
            return response;
        }
    },

    /**
     * Updates a hero.
     * @param {IHero} hero - The hero data.
     * @returns {Promise<void>} A promise that resolves when the hero is updated.
     * @throws {Error} An error if the request fails.
     */

    async updateHero(this: IHeroState, hero: IHero) {
        
        const authStore = useAuthStore();
        const response: any = await $fetch(`http://localhost:3000/heroes/${hero.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
            body: hero,
        });
        if(response.error) {
            throw new Error(response.error);
        } else {
            this.heroes = this.heroes.map((h: IHero) => h.id === hero.id ? hero : h);
            return response;
        }
    },

    /** 
     *   
     * Deletes a hero.
     * @param {number} id - The hero ID.
     * @returns {Promise<void>} A promise that resolves when the hero is deleted.
     * @throws {Error} An error if the request fails.
     */
    async deleteHero(this: IHeroState, id: string) {
        
        const authStore = useAuthStore();
        const response: any = await $fetch(`http://localhost:3000/heroes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`,
            },
        });
        if(response.error) {
            throw new Error(response.error);
        } else {
            this.heroes = this.heroes.filter((h: IHero) => h.id !== id);
            return response;
        }
    }
};