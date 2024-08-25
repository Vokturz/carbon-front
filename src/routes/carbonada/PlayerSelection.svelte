<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    let numberOfPlayers = 1;
  
    function handleStart() {
      dispatch('start', { numberOfPlayers });
    }
</script>
  
<div class="player-selection">
    <label for="playerCount">Número de Jugadores:</label>
    <div class="pixel-select-wrapper">
      <select id="playerCount" bind:value={numberOfPlayers} class="pixel-select">
        {#each Array(4) as _, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </div>
    <button class="pixel-button" on:click={handleStart}>Jugar</button>
</div>
  
<style>
    .player-selection {
      margin-bottom: 20px;
      text-align: center;
      color: white;
      font-family: 'Press Start 2P', cursive;
    }
    .pixel-select-wrapper {
      display: inline-block;
      position: relative;
      margin: 0 10px;
    }
    .pixel-select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #fff;
      border: 4px solid #000;
      padding: 5px 30px 5px 10px;
      font-family: 'Press Start 2P', cursive;
      font-size: 16px;
      color: #000;
      cursor: pointer;
    }
    .pixel-select-wrapper::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #fff;
      pointer-events: none;
    }
    .pixel-button {
      background-color: #4CAF50;
      border: 4px solid #2E7D32;
      color: white;
      padding: 10px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
      box-shadow: 0 4px #1B5E20;
      transition: all 0.1s ease-in-out;
    }
    .pixel-button:active {
      box-shadow: 0 2px #1B5E20;
      transform: translateY(2px);
    }
</style>
