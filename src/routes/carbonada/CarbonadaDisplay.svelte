<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { timeline, draggingCard } from './stores';
    import type { Card } from './types';
	import { placeCard } from './carbonadaLogic';
  
    let hoveringIndex: number | null = null;
  
    const dispatch = createEventDispatcher();
  
    function handleDragOver(event: DragEvent, index: number) {
      event.preventDefault();
      hoveringIndex = index;
    }
  
    function handleDrop(event: DragEvent, index: number) {
      event.preventDefault();
      const droppedCard = JSON.parse(event.dataTransfer?.getData('text') || '{}');
      

      placeCard(droppedCard, index)

      dispatch('place', { card: droppedCard, index });
      draggingCard.set(null);
      hoveringIndex = null;
    }
  
  </script>
  
  <div class="timeline-container">
    <div class="timeline">
      <div class="drop-zone"
        on:dragover={(e) => handleDragOver(e, 0)}
        on:drop={(e) => handleDrop(e, 0)}
        role="region"
        aria-label="Drop zone for first card">
        {#if $timeline.length === 0}
						{#if hoveringIndex === 0 && $draggingCard}
							<div class="card hovering">
								<h4>{$draggingCard.name}</h4>
								<p>{$draggingCard.description}</p>
							</div>
						{:else}
							<div class="card placeholder">
								<p>Drop 1st card here</p>
							</div>
						{/if}
					{:else if hoveringIndex === 0 && $draggingCard}
						<div class="card hovering">
							<h4>{$draggingCard.name}</h4>
							<p>{$draggingCard.description}</p>
						</div>
					{/if}
      </div>
  
      {#each $timeline as card, index (card.name)}
        <div class="timeline-item">
          <div class="card placed">
            <h4>{card.name}</h4>
            <p><b>Carbon Footprint</b>:<br> {card.carbonFootprint.toFixed(2)} kg CO2e </p>
            <p>{card.description}</p>
          </div>
          <div class="drop-zone"
            on:dragover={(e) => handleDragOver(e, index + 1)}
            on:drop={(e) => handleDrop(e, index + 1)}
            role="region" aria-label="Drop zone">
            {#if hoveringIndex === index + 1 && $draggingCard}
              <div class="card hovering">
                <h4>{$draggingCard.name}</h4>
                <p>{$draggingCard.description}</p>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>

	.timeline-container {
	  width: 100%;
	  overflow-x: auto;
	  margin-bottom: 20px;
	}
  
	.timeline {
	  display: flex;
	  align-items: stretch;
	  min-height: 200px;
	  justify-content: center;
	}
  
	.timeline-item {
	  display: flex;
	  align-items: stretch;
	}
  
	.drop-zone {
	  /* width: 20px; */
	  background-color: transparent;
	  border-left: 10px dashed transparent;
	  border-right: 10px dashed transparent;
	  margin: 0 10px;
	}
  
  
	.card {
	  background-color: #ffffff;
	  border: 1px solid #ddd;
	  border-radius: 5px;
	  padding: 10px;
	  width: 200px;
	  height: 150px;
	  cursor: move;
	  transition: background-color 0.3s;
	  overflow-y: auto;
	  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}
  
	.card:hover {
	  background-color: #f0f0f0;
	}
  
	.card.placed {
	  background-color: #e6f3ff;
	  cursor: default;
	}

  	.card.placeholder {
		background-color: #f0f0f0;
		border: 1px dashed #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150px;
		color: #999;
		font-style: italic;
	}

	.card p {
	  color: #666;
	}

	.card.hovering {
		opacity: 0.5;
		background-color: #dff0ff;
	}
  
  </style>