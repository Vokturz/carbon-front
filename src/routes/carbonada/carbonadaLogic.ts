import { get } from 'svelte/store';
import { cards, timeline, availableCards, currentCard, gameState, progress } from './stores';
import type { Card, GameState } from './types';

export function startGame(event: CustomEvent) {

  const { numberOfPlayers } = event.detail
  const allCards = get(cards);
  availableCards.set([...allCards.filter(p => p.name.length <= 30)].sort(() => Math.random() - 0.5));
  timeline.set([]);
  gameState.set({
    started: true,
    over: false,
    currentPlayerTurn: 1,
    playerScores: Array(numberOfPlayers).fill(0),
    maxCO2e: 1000,
    currentCO2e: 0
  });
  currentCard.set(null);
}

export function placeCard(product: Card, index: number) {

  availableCards.update(cards => cards.filter(p => p.name !== product.name))

  const currentGameState = get(gameState)
  const currentTimeline = get(timeline);
  const isCorrectPlacement = product.carbonFootprint + currentGameState.currentCO2e <= currentGameState.maxCO2e


  if (isCorrectPlacement) {
    timeline.update(tl => [
      ...tl.slice(0, index),
      product,
      ...tl.slice(index)
    ]);
    gameState.update(state => {
      state.playerScores[state.currentPlayerTurn - 1]++;
      state.currentPlayerTurn = state.currentPlayerTurn % state.playerScores.length + 1;
      state.currentCO2e += product.carbonFootprint;
      return state;
    });
    progress.set(Math.min(currentGameState.currentCO2e / currentGameState.maxCO2e, 100))
    currentCard.set(null);
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
  timeline.set([]);
}