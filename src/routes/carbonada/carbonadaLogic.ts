import { get } from 'svelte/store';
import { cards, carbonada, availableCards, currentCard, gameState, progress } from './stores';
import type { Card, GameState } from './types';

export function startGame(event: CustomEvent) {

  const { numberOfPlayers } = event.detail
  const allCards = get(cards);
  availableCards.set([...allCards.filter(p => p.name.length <= 30)].sort(() => Math.random() - 0.5));
  carbonada.set([]);
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

export function placeCard(card: Card, index: number) {

  console.log({card})
  availableCards.update(cards => cards.filter(p => p.name !== card.name))

  const currentGameState = get(gameState)
  const isCorrectPlacement = card.carbonFootprint + currentGameState.currentCO2e <= currentGameState.maxCO2e


  if (isCorrectPlacement) {
    carbonada.update(tl => [...tl, card]);
    gameState.update(state => {
      state.playerScores[state.currentPlayerTurn - 1]++;
      state.currentPlayerTurn = state.currentPlayerTurn % state.playerScores.length + 1;
      state.currentCO2e += card.carbonFootprint;
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
  carbonada.set([]);
}