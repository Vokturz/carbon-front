<script lang="ts">
	import { onMount } from 'svelte';
	import { cards, gameState } from './stores';
	import { startGame, restartGame } from './carbonadaLogic';
	import PlayerSelection from './PlayerSelection.svelte';
	import CarbonadaDisplay from './CarbonadaDisplay.svelte';
	import CurrentProduct from './CurrentCard.svelte';
	import GameOver from './GameOver.svelte';
  
	onMount(async () => {
	  try {
		const response = await fetch('/api/products');
		$cards = await response.json();
	  } catch (error) {
		console.error('Failed to fetch products:', error);
	  }
	});
  </script>
  
  <main>
	<h1>Carbonada Game</h1>
	{#if !$gameState.started}
	  <PlayerSelection on:start={startGame} />
	{:else if !$gameState.over}
	  <CarbonadaDisplay />
	  <div class="player-info">
		<p>Current Player: {$gameState.currentPlayerTurn}</p>
	</div>
	  <CurrentProduct />
	{:else}
	  <GameOver on:restart={restartGame} />
	{/if}
  </main>
  

  <style>
	main {
	  padding: 20px;
	}

	.player-info {
		text-align: center;
		margin-bottom: 20px;
	}

  </style>