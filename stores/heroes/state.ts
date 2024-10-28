/**
 * @file state.ts
 * @description This file contains the initial state of the heroes store.
 * @exports useState
 * @exports IHeroState
 */

import type { IHero } from '@/types/heroes';

export function useState() {
  return {
    heroes: [] as IHero[]
  };
}

export type IHeroState = ReturnType<typeof useState>;