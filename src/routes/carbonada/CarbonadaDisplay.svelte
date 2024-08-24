<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { draggingCard } from './stores';
	import { placeCard } from './carbonadaLogic';
	import ProgressBar from './ProgressBar.svelte';
	import CardList from './CardList.svelte';
  
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


  <CardList />
  <div class="carbonada-container">
    <div class="carbonada">
      <div class="drop-zone"
        on:dragover={(e) => handleDragOver(e, 0)}
        on:drop={(e) => handleDrop(e, 0)}
        role="region"
        aria-label="Drop zone for first card">

		{#if hoveringIndex === 0 && $draggingCard}
			<div class="card hovering">
				<h4>{$draggingCard.name}</h4>
				<p>{$draggingCard.description}</p>
			</div>
		{:else}
			<div class="card placeholder">
				<p>Drop card here</p>
			</div>
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