<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    let numberOfPlayers = 1;
  
    function handleStart() {
      dispatch('start', { numberOfPlayers });
    }
  </script>
  
  <div class="player-selection">
    <label for="playerCount">Number of Players:</label>
    <select id="playerCount" bind:value={numberOfPlayers}>
      {#each Array(4) as _, i}
        <option value={i + 1}>{i + 1}</option>
      {/each}
    </select>
    <button on:click={handleStart}>Start Game</button>
  </div>
  
  <style>
    .player-selection {
      margin-bottom: 20px;
      text-align: center;
    }
    .player-selection select {
      margin: 0 10px;
    }
  </style>