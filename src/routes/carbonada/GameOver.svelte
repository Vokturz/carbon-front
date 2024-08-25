<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { gameState, currentItem } from './stores';
  const dispatch = createEventDispatcher();

  let exceeededCO2e = $gameState.currentCO2e - $gameState.maxCO2e;
</script>

<div class="modal-overlay">
  <div class="modal-content">
    <h2>HAS PERDIDO!</h2>
    {#if $currentItem}
      <p> Último item <b>{$currentItem.product}</b> ({$currentItem.carbon_footprint.toFixed(1)} kg CO2e) </p>
    {/if}
    <p>Has excedido el límite de kg CO2e por  {exceeededCO2e.toFixed(1)} </p>
    <button class="pixel-button" on:click={() => dispatch('restart')}>Reiniciar</button>
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
