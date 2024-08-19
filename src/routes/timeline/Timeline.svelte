<script lang="ts">
	import { onMount } from 'svelte';
	import { products, gameState } from './stores';
	import { startGame, restartGame } from './timelineLogic';
	import PlayerSelection from './PlayerSelection.svelte';
	import TimelineDisplay from './TimelineDisplay.svelte';
	import CurrentProduct from './CurrentProduct.svelte';
	import GameOver from './GameOver.svelte';
  
	onMount(async () => {
	  try {
		const response = await fetch('/api/products');
		$products = await response.json();
	  } catch (error) {
		console.error('Failed to fetch products:', error);
	  }
	});
  </script>
  
  <main>
	<h1>Timeline Game</h1>
	{#if !$gameState.started}
	  <PlayerSelection on:start={startGame} />
	{:else if !$gameState.over}
	  <TimelineDisplay />
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