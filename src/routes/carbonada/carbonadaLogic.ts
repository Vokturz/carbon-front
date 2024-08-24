import { get } from 'svelte/store';
import { carbonada, currentItem, gameState, progress } from './stores';
import type { Item, GameState } from './types';

export function startGame(event: CustomEvent) {

  const { numberOfPlayers } = event.detail
  carbonada.set([]);
  gameState.set({
    started: true,
    over: false,
    currentPlayerTurn: 1,
    playerScores: Array(numberOfPlayers).fill(0),
    maxCO2e: 1000,
    currentCO2e: 0
  });
  currentItem.set(null);
}

export function placeItem(card: Item) {

  const currentGameState = get(gameState)
  const isCorrectPlacement = card.carbon_footprint + currentGameState.currentCO2e <= currentGameState.maxCO2e


  if (isCorrectPlacement) {
    carbonada.update(tl => [...tl, card]);
    gameState.update(state => {
      state.playerScores[state.currentPlayerTurn - 1]++;
      state.currentPlayerTurn = state.currentPlayerTurn % state.playerScores.length + 1;
      state.currentCO2e += card.carbon_footprint;
      return state;
    });
    progress.set(Math.min(currentGameState.currentCO2e / currentGameState.maxCO2e, 100))
    currentItem.set(null);
  } else {
    // game over
    gameState.update(state => ({ ...state, over: true }));
  }
}

export function restartGame() {
  gameState.set({
    started: false,
    over: false,
    currentPlayerTurn: 1,
    playerScores: [],
    maxCO2e: 1000,
    currentCO2e: 0
  });
  carbonada.set([]);
}