<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import { carbonada } from './stores';
	import ProgressBar from './ProgressBar.svelte';
	import type { Item } from './types';
  

	let items: Item[] = [];
    carbonada.subscribe(value => {
        items = value;
    });
</script>

  <div class="carbonada-container">
    <div class="carbonada">
        <div class="pot">
            {#if items.length > 0}
                <ul>
                    {#each items as item}
                        <li>{item.product}</li>
                    {/each}
                </ul>
            {:else}
                <p>No items in the pot</p>
            {/if}
        </div>
    </div>
	<ProgressBar />
  </div>
  
  <style>
	.carbonada-container {
		width: 100%;
		display: flex;
		justify-content: center;
		position: relative;
		margin-bottom: 20px;
	}
  
	.carbonada {
	  flex: 1;
	  overflow-x: auto;
	  display: flex;
	  align-items: stretch;
	  min-height: 200px;
	  justify-content: center;
	}
  

  	.pot {
		background-color: #f0f0f0;
		border: 1px dashed #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 500px;
		height: 200px;
		color: #999;
		font-style: italic;
	}



  
  </style>