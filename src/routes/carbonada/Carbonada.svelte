<script lang="ts">
	import { gameState } from './stores';
	import { startGame, restartGame } from './carbonadaLogic';
	import PlayerSelection from './PlayerSelection.svelte';
	import CarbonadaDisplay from './CarbonadaDisplay.svelte';
	import GameOver from './GameOver.svelte';
	import ItemsList from './ItemsList.svelte';
	import SearchItem from './SearchItem.svelte';
</script>

<main>
  {#if !$gameState.started}
    <PlayerSelection on:start={startGame} />
  {:else}
    <p>Current Player: {$gameState.currentPlayerTurn}</p>
    <ItemsList />
    <SearchItem />
    <CarbonadaDisplay />
    <div class="player-info">
    </div>
    
    {#if $gameState.over}
      <GameOver on:restart={restartGame} />
    {/if}
  {/if}
</main>

<style>
  main {
    padding: 20px;
    position: relative;
  }

  .player-info {
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    position: relative;
    text-align: center;
  }
</style>
