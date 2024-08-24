import { writable } from 'svelte/store';
import type { Card, GameState } from './types';

export const cards = writable<Card[]>([]);
export const timeline = writable<Card[]>([]);
export const availableCards = writable<Card[]>([]);
export const currentCard = writable<Card | null>(null);
export const draggingCard = writable<Card | null>(null);
export const gameState = writable<GameState>({
  started: false,
  over: false,
  currentPlayerTurn: 1,
  playerScores: [] as number[],
  maxCO2e: 100,
  currentCO2e: 0
});
export const progress = writable(0);