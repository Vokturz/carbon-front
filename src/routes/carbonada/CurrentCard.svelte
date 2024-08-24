<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Card } from './types';
    import { currentCard, availableCards, draggingCard } from './stores';
    import { highlightMatch } from './utils';
  
    let inputValue = '';
    let showResults = false;
  
    const dispatch = createEventDispatcher();
  
    function filterCards(input: string) {
      return $availableCards.filter((card: Card) => 
        card.name.toLowerCase().includes(input.toLowerCase())
      );
    }
  
    function selectCard(card: Card) {
      currentCard.set(card);
      availableCards.update((cards: Card[]) => cards.filter(p => p.name !== card.name));
      inputValue = '';
      showResults = false;
    }
  
    function handleDragStart(event: DragEvent, card: Card) {
      if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', JSON.stringify(card));
        draggingCard.set(card);
      }
    }
  </script>
  
  <h2 style="text-align: center;">Current Card</h2>
  <div 
    class="card current-event" 
    draggable={!!$currentCard}
    on:dragstart={(e) => $currentCard && handleDragStart(e, $currentCard)}
    on:dragend={() => dispatch('dragend')}
    role={$currentCard ? "button" : ""}
    aria-label={$currentCard ? "Draggable current card" : ""}
  >
    {#if $currentCard}
      <h3>{$currentCard.name}</h3>
      <p>{$currentCard.description}</p>
    {:else}
      <div class="autocomplete">
        <input
          type="text"
          bind:value={inputValue}
          placeholder="Type a card"
          on:focus={() => showResults = true}
          on:blur={() => setTimeout(() => showResults = false, 200)}
        />
        {#if showResults && inputValue.length > 0}
          <ul class="autocomplete-results">
            {#each filterCards(inputValue) as card}
              <button 
                on:mousedown|preventDefault={() => selectCard(card)}
                class="card-button"
              >
                {@html highlightMatch(card.name, inputValue)}
              </button>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </div>
  
  <style>
  
	.current-event {
    margin: 20px auto;
    background-color: #f0f0f0;
    border: 2px solid #4CAF50;
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
  
  
	.card h3 {
	  margin-top: 0;
	  color: #333;
	}
  
	.card p {
	  color: #666;
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

	.card.current-event {
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px;
		width: 200px;
		height: auto;
		min-height: 150px;
		cursor: move;
		transition: background-color 0.3s;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}



	.autocomplete {
		position: relative;
		width: 100%;
	}

	.autocomplete input {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border: none;
		background-color: transparent;
		outline: none;
	}

	.autocomplete-results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		border-top: none;
		list-style-type: none;
		padding: 0;
		margin: 0;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
	}


	.card-button {
		background: none;
		border: none;
		padding: 10px;
		margin: 0;
		font: inherit;
		cursor: pointer;
		text-align: left;
		width: 100%;
		transition: background-color 0.3s;
		color: #666;
}
  </style>