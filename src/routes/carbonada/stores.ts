import { writable } from 'svelte/store';
import type { Item, GameState } from './types';

export const carbonada = writable<Item[]>([]); // list of items
export const currentItem = writable<Item | null>(null);
export const gameState = writable<GameState>({
  started: false,
  over: false,
  currentPlayerTurn: 1,
  playerScores: [] as number[],
  maxCO2e: 100,
  currentCO2e: 0
});
export const progress = writable(0);