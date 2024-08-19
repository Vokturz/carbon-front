import { writable } from 'svelte/store';
import type { Product } from './types';

export const products = writable<Product[]>([]);
export const timeline = writable<Product[]>([]);
export const availableProducts = writable<Product[]>([]);
export const currentProduct = writable<Product | null>(null);
export const draggingProduct = writable<Product | null>(null);
export const gameState = writable({
  started: false,
  over: false,
  currentPlayerTurn: 1,
  playerScores: [] as number[]
});