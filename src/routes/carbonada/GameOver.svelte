<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { gameState } from './stores';
  const dispatch = createEventDispatcher();

  let exceeededCO2e = $gameState.currentCO2e - $gameState.maxCO2e;
</script>

<div class="modal-overlay">
  <div class="modal-content">
    <h2>Game Over!</h2>
    <p>You have exceeded the CO2e limit by {exceeededCO2e.toFixed(2)} </p>
    <button on:click={() => dispatch('restart')}>Restart</button>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
