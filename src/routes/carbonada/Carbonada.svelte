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
  <div class="content">
    {#if !$gameState.started}
      <PlayerSelection on:start={startGame} />
    {:else}
      <p style="color: #03A61C;">Jugar Actual: {$gameState.currentPlayerTurn}</p>
      <ItemsList />
      <SearchItem />
      <CarbonadaDisplay />
      <div class="player-info">
      </div>
      
      {#if $gameState.over}
        <GameOver on:restart={restartGame} />
      {/if}
    {/if}

  </div>

</main>
<footer>
  <p>Proyecto para la Hackathon de OpenaI <a href="https://github.com/aastroza/carbonada">CARBONADA</a> </p>
</footer>

<style>
  main {
    padding: 20px;
    margin-top: 8%;
    width: 60vw;
    height: 70vh;
    position: flex;
    background-color: rgba(212, 138, 0, 0.507); 
    border: 8px solid #000;
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px #000;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .player-info {
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    position: relative;
    text-align: center;
    color: white;
    font-size: 14px;
    text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000, 
    -2px -2px 0 #fff,  
     2px -2px 0 #fff,
    -2px  2px 0 #fff,
     2px  2px 0 #fff;
  }

  a {
    text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000, 
    -2px -2px 0 #fff,  
     2px -2px 0 #fff,
    -2px  2px 0 #fff,
     2px  2px 0 #fff;
  }

  footer {
    text-align: center;
    padding: 10px;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    main {
      height: 55vh;
    }
  }
</style>
