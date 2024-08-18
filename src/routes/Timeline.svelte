<script lang="ts">
	import { onMount } from 'svelte';

	interface Product {
		id: number;
		name: string;
		carbonFootprint: number;
		description: string;
		source: string;
	}

	let products: Product[] = [];
	let timeline: Product[] = [];
	let availableProducts: Product[] = [];
	let currentProduct: Product | null = null;
	let gameStarted = false;
	let gameOver = false;
	let draggingProduct: Product | null = null;
	let hoveringIndex: number | null = null;

	// Multiplayer
	let numberOfPlayers = 1;
	let playerScores: number[] = [];
	let currentPlayerTurn = 0;



	function startGame() {
		timeline = [];
		availableProducts = [...products.filter(p => p.name.length <= 30)].sort(() => Math.random() - 0.5);
		gameOver = false;
		currentPlayerTurn = 1;
		playerScores = Array(numberOfPlayers).fill(0);
		gameStarted = true;
		nextProduct();
	}

	function nextProduct() {
		if (availableProducts.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableProducts.length);
			currentProduct = availableProducts[randomIndex];
			availableProducts = availableProducts.filter((_, index) => index !== randomIndex);
		} else {
			gameOver = true;
			gameStarted = false;
			currentProduct = null;
		}
	}

	function handleDragStart(event: any, card: Product | null) {
		event.dataTransfer.setData('text/plain', JSON.stringify(card));
		draggingProduct = card;
	}

	function handleDragOver(event: any, index: number) {
		event.preventDefault();
		hoveringIndex = index;
	}

	function handleDrop(event: any, index: number) {
		event.preventDefault();
		const droppedCard = JSON.parse(event.dataTransfer.getData('text'));
		placeProduct(droppedCard, index);
		draggingProduct = null;
		hoveringIndex = null;
	}

	function handleDragEnd() {
		hoveringIndex = null;
	}

	function placeProduct(product: Product, index: number) {
		const isCorrectPlacement =
			(index === 0 || timeline[index - 1].carbonFootprint <= product.carbonFootprint) &&
			(index === timeline.length || timeline[index].carbonFootprint >= product.carbonFootprint);

		if (isCorrectPlacement) {
			timeline = [
				...timeline.slice(0, index),
				product,
				...timeline.slice(index)
			];
			playerScores[currentPlayerTurn]++
			nextTurn();
			nextProduct();
		} else {
			gameOver = true;
		}
	}

	function nextTurn(){
		currentPlayerTurn = currentPlayerTurn % numberOfPlayers + 1;
	}

	function restartGame(){
		timeline = [];
		gameOver = false;
		gameStarted = false;
	}

	onMount(async () => {
		const response = await fetch('/api/products');
		products = await response.json();
		// startGame();
	})
</script>

<main>
	<h1>Timeline Game</h1>

	{#if !gameOver && timeline.length === 0 && !gameStarted }
		<div class="player-selection">
			<label for="playerCount">Number of Players:</label>
			<select id="playerCount" bind:value={numberOfPlayers}>
			{#each Array(4) as _, i}
				<option value={i + 1}>{i + 1}</option>
			{/each}
			</select>
			<button on:click={startGame}>Start Game</button>
		</div>
	{:else}
		<div class="timeline-container">
			<div class="timeline">
				<!-- on:dragleave={handleDragEnd} -->
				<div class="drop-zone"
					on:dragover={(e) => handleDragOver(e, 0)}
					on:drop={(e) => handleDrop(e, 0)}
					role="region"
					aria-label="Drop zone for first product">
					{#if timeline.length === 0}
						{#if hoveringIndex === 0 && draggingProduct}
							<div class="card hovering">
								<h4>{draggingProduct.name}</h4>
								<p>{draggingProduct.description}</p>
							</div>
						{:else}
							<div class="card placeholder">
								<p>Drop 1st product here</p>
							</div>
						{/if}
					{:else if hoveringIndex === 0 && draggingProduct}
						<div class="card hovering">
							<h4>{draggingProduct.name}</h4>
							<p>{draggingProduct.description}</p>
						</div>
					{/if}
				</div>

				{#each timeline as product, index (product.name)}
					<div class="timeline-item">
						<div class="card placed">
							
							<h4>{product.name}</h4>
							<p><b>Carbon Footprint</b>:<br> {product.carbonFootprint.toFixed(2)} kg CO2e </p>
							<p>{product.description}</p>
						</div>
						<!-- on:dragleave={handleDragEnd} -->
						<div class="drop-zone"
							on:dragover={(e) => handleDragOver(e, index + 1)}
							on:drop={(e) => handleDrop(e, index + 1)}
							role="region" aria-label="Drop zone"> 
							{#if hoveringIndex === index + 1 && draggingProduct}
								<div class="card hovering">
									<h4>{draggingProduct.name}</h4>
									<p>{draggingProduct.description}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		
		<div class="player-info">
			<p>Current Player: {currentPlayerTurn}</p>
		</div>
		<h2 style="text-align: center;">Current Product</h2>
		{#if currentProduct}
			<div 
				class="card current-event" 
				draggable="true"
				on:dragstart={(e) => handleDragStart(e, currentProduct)}
				on:dragend={handleDragEnd}
				role="button"
				aria-label="Draggable current product"
				tabindex="0"
			>
				<h3>{currentProduct.name.toWellFormed()}</h3>
				<p>{currentProduct.description}</p>
			</div>
		{:else}
			<p style="text-align: center;">No more products</p>
		{/if}
	{/if}

	{#if gameOver}
		<div class="game-over">
			<h2>{availableProducts.length === 0 && timeline.length === products.length ? 'Congratulations! You won!' : 'Game Over!'}</h2>
			<button on:click={restartGame}>Restart</button>
		</div>
	{/if}
</main>



  
  <style>
	main {
	  padding: 20px;
	}

	.player-selection {
    margin-bottom: 20px;
    text-align: center;
	}

	.player-selection select {
		margin: 0 10px;
	}

	.player-info {
		text-align: center;
		margin-bottom: 20px;
	}
  
	.current-event {
    margin: 20px auto;
    background-color: #f0f0f0;
    border: 2px solid #4CAF50;
  	}

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
  
	.card h3, .card h4 {
	  margin-top: 0;
	  color: #333;
	}
  
	.card p {
	  color: #666;
	}
  
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

	.card.hovering {
		opacity: 0.5;
		background-color: #dff0ff;
	}
  </style>