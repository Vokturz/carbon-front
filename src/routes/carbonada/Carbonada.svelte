<script lang="ts">
	import { onMount } from 'svelte';
	import { gameState } from './stores';
	import { startGame, restartGame } from './carbonadaLogic';
	import PlayerSelection from './PlayerSelection.svelte';
	import CarbonadaDisplay from './CarbonadaDisplay.svelte';
	import GameOver from './GameOver.svelte';
	import CardList from './CardList.svelte';
	import SearchItem from './SearchItem.svelte';
  
  </script>
  
<main>
	<h1 class="header">Carbonada Game</h1>
	{#if !$gameState.started}
	  <PlayerSelection on:start={startGame} />
	{:else if !$gameState.over}
	  <!-- <CardList /> -->
	  <SearchItem />
	  <CarbonadaDisplay />
	  <div class="player-info">
		
	</div>
	<p>Current Player: {$gameState.currentPlayerTurn}</p>
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

	.header {
		position: absolute;
		top: 30px;
		left: 30px;
		margin: 0;
		padding: 10px;
  	}
  </style>