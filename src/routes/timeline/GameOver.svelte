<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { availableProducts, timeline, products } from './stores';
  
    const dispatch = createEventDispatcher();
  
    $: isWin = $availableProducts.length === 0 && $timeline.length === $products.length;
  </script>
  
  <div class="game-over">
    <h2>{isWin ? 'Congratulations! You won!' : 'Game Over!'}</h2>
    <button on:click={() => dispatch('restart')}>Restart</button>
  </div>
  
  <style>
    .game-over {
      text-align: center;
      margin-top: 20px;
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