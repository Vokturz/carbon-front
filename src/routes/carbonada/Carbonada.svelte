<script lang="ts">
import { gameState } from './stores';
import { startGame, restartGame } from './carbonadaLogic';
import Onboarding from './Onboarding.svelte';
import CarbonadaDisplay from './CarbonadaDisplay.svelte';
import GameOver from './GameOver.svelte';
import ItemsList from './ItemsList.svelte';
import SearchItem from './SearchItem.svelte';
</script>

<main>

    {#if !$gameState.started}
      <Onboarding on:start={startGame} />
    {:else}
    <div class="content">
      <p style="color: #03A61C;">Jugar Actual: {$gameState.currentPlayerTurn}</p>
      <ItemsList />
      <SearchItem />
      <CarbonadaDisplay />
      <div class="player-info">
      </div>
      
      {#if $gameState.over}
        <GameOver on:restart={restartGame} />
      {/if}
    </div>
    {/if}



</main>
<footer>
  <p>Proyecto para la Hackathon de OpenaI <a href="https://github.com/aastroza/carbonada">CARBONADA</a> </p>
</footer>

<style>

  .content {
    padding: 20px;
    margin-top: 8%;
    width: 60vw;
    height: 70vh;
    position: flex;
    background-color: rgba(212, 138, 0, 0.623); 
    border: 8px solid #000;
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px #000;
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
    .content {
      height: 55vh;
    }
  }
</style>
