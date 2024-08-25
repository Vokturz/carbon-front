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
    <button class="pixel-button" on:click={handleStart}>Start Game</button>
</div>
  
<style>
    .player-selection {
      margin-bottom: 20px;
      text-align: center;
      color: white;
    }
    .player-selection select {
      margin: 0 10px;
    }
    .pixel-button {
      background-color: #4CAF50; /* Green */
      border: 4px solid #2E7D32; /* Darker green border */
      color: white;
      padding: 10px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive; /* Pixel art font */
      box-shadow: 0 4px #1B5E20; /* Darker green shadow */
      transition: all 0.1s ease-in-out;
    }
    .pixel-button:active {
      box-shadow: 0 2px #1B5E20;
      transform: translateY(2px);
    }

</style>
