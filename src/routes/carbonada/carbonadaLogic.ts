import { get } from 'svelte/store';
import { carbonada, currentItem, gameState, loading, progress } from './stores';
import type { Item } from './types';

export function startGame(event: CustomEvent) {

  const { numberOfPlayers } = event.detail
  carbonada.set([]);
  gameState.set({
    started: true,
    over: false,
    currentPlayerTurn: 1,
    playerScores: Array(numberOfPlayers).fill(0),
    maxCO2e: 100,
    currentCO2e: 0
  });
  currentItem.set(null);
  progress.set(0)
  loading.set(false)
}

export function placeItem(item: Item) {

  const currentGameState = get(gameState)
  const isCorrectPlacement = item.carbon_footprint + currentGameState.currentCO2e <= currentGameState.maxCO2e


  
  gameState.update(state => {
    state.playerScores[state.currentPlayerTurn - 1]++;
    state.currentPlayerTurn = state.currentPlayerTurn % state.playerScores.length + 1;
    state.currentCO2e += item.carbon_footprint;
    return state;
  });
  progress.set(Math.min(currentGameState.currentCO2e / currentGameState.maxCO2e, 100))
  carbonada.update(tl => [...tl, item]);
  if (!isCorrectPlacement) {
    gameState.update(state => ({ ...state, over: true }));
  }
}

export function restartGame() {
  gameState.set({
    started: false,
    over: false,
    currentPlayerTurn: 1,
    playerScores: [],
    maxCO2e: 0,
    currentCO2e: 0
  });
  carbonada.set([]);
  progress.set(0)
  loading.set(false)
}