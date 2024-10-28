import {
    spellsTypes,
    spellsTarget,
    spellsDuration,
    spellsEffect,
  } from './spells.enum';
  
  export interface IActiveSpell {
    name: string;
    description: string;
    type: spellsTypes;
    target: spellsTarget;
    duration: spellsDuration;
    effect: spellsEffect;
    value: number;
  }
  
  export interface IPassiveSpell {
    name: string;
    description: string;
    type: spellsTypes;
    target: spellsTarget;
    duration: spellsDuration;
    effect: spellsEffect;
    value: number;
  }
  




export interface IHero {
    id?: string
    name: string;
    description: string;
    type: string;
    passiveSpell: IPassiveSpell;
    activeSpell: IActiveSpell;
}

