<script lang="ts">
	import { onMount } from 'svelte';

	interface Product {
		id: number;
		name: string;
		carbonFootprint: number;
		description: string;
		source: string;
	}

	let products: Product[] = []


	let timeline: Product[] = [];
	let availableProducts: Product[] = [];
	let currentProduct: Product | null = null;
	let gameOver = false;

	function startGame() {
		timeline = [];
		availableProducts = [...products.filter(p => p.name.length <= 30)].sort(() => Math.random() - 0.5);
		gameOver = false;
		nextProduct();
	}

	function nextProduct() {
		if (availableProducts.length > 0) {
			const randomIndex = Math.floor(Math.random() * availableProducts.length);
			currentProduct = availableProducts[randomIndex];
			availableProducts = availableProducts.filter((_, index) => index !== randomIndex);
		} else {
			gameOver = true;
			currentProduct = null;
		}
	}

	function handleDragStart(event: any ,card: Product) {
		event.dataTransfer.setData('text/plain', JSON.stringify(card));
	}

	function handleDragOver(event: any) {
		event.preventDefault();
	}

	function handleDrop(event: any, index: number) {
		event.preventDefault();
		const droppedCard = JSON.parse(event.dataTransfer.getData('text'));
		placeProduct(droppedCard, index);
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
		nextProduct();
		} else {
		gameOver = true;
		}
	}

	onMount(async () => {
		const response = await fetch('/api/products');
        products = await response.json();
		startGame();
	})

	
</script>
<main>
	<h1>Timeline Game</h1>
	<div class="timeline-container">
	  <div class="timeline">
		<div class="drop-zone" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, 0)}></div>
		{#each timeline as product, index (product.name)}
		  <div class="timeline-item">
			<div class="card placed">
			  <h3>Carbon Footprint: {product.carbonFootprint.toFixed(2)} kg CO2e </h3>
			  <h4>{product.name}</h4>
			  <p>{product.description}</p>
			</div>
			<div class="drop-zone" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, index + 1)}></div>
		  </div>
		{/each}
	  </div>
	</div>
	
	<h2 style="text-align: center;">Current Product</h2>
	{#if currentProduct}
	  <div 
		class="card current-event" 
		draggable="true"
		on:dragstart={(e) => handleDragStart(e, currentProduct)}
	  >
		<h3>{currentProduct.name.toWellFormed()}</h3>
		<p>{currentProduct.description}</p>
	  </div>
	{:else}
	  <p style="text-align: center;">No more products</p>
	{/if}
  
	{#if gameOver}
	  <div class="game-over">
		<h2>{availableProducts.length === 0 && timeline.length === products.length ? 'Congratulations! You won!' : 'Game Over!'}</h2>
		<button on:click={startGame}>Play Again</button>
	  </div>
	{/if}
  </main>
  
  <style>
	main {
	  padding: 20px;
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
	  width: 20px;
	  background-color: transparent;
	  border-left: 2px dashed #ccc;
	  margin: 0 10px;
	}
  
	.available-products {
	  display: flex;
	  flex-wrap: wrap;
	  gap: 20px;
	  justify-content: center;
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
  </style>