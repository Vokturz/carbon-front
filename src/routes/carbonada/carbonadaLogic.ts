import { get } from 'svelte/store';
import { cards, timeline, availableCards, currentCard, gameState } from './stores';
import type { Card } from './types';

export function startGame(event: CustomEvent) {

  const { numberOfPlayers } = event.detail
  const allCards = get(cards);
  availableCards.set([...allCards.filter(p => p.name.length <= 30)].sort(() => Math.random() - 0.5));
  timeline.set([]);
  gameState.set({
    started: true,
    over: false,
    currentPlayerTurn: 1,
    playerScores: Array(numberOfPlayers).fill(0)
  });
  currentCard.set(null);
}

export function placeCard(product: Card, index: number) {

  availableCards.update(cards => cards.filter(p => p.name !== product.name))

  const currentTimeline = get(timeline);
  const isCorrectPlacement =
    (index === 0 || currentTimeline[index - 1].carbonFootprint <= product.carbonFootprint) &&
    (index === currentTimeline.length || currentTimeline[index].carbonFootprint >= product.carbonFootprint);

  if (isCorrectPlacement) {
    timeline.update(tl => [
      ...tl.slice(0, index),
      product,
      ...tl.slice(index)
    ]);
    gameState.update(state => {
      state.playerScores[state.currentPlayerTurn - 1]++;
      state.currentPlayerTurn = state.currentPlayerTurn % state.playerScores.length + 1;
      return state;
    });
    currentCard.set(null);
  } else {
    gameState.update(state => ({ ...state, over: true }));
  }
}

export function restartGame() {
  gameState.set({
    started: false,
    over: false,
    currentPlayerTurn: 1,
    playerScores: []
  });
  timeline.set([]);
}