<script>
	let events = [
		{ year: 1969, name: "Moon Landing", description: "Apollo 11 lands on the moon" },
		{ year: 1969, name: "Woodstock", description: "Famous music festival held in New York" },
		{ year: 1989, name: "Fall of the Berlin Wall", description: "The Berlin Wall is torn down" },
		{ year: 1989, name: "First GPS Satellite", description: "First GPS satellite put into orbit" },
		{ year: 2001, name: "Wikipedia Founded", description: "The free online encyclopedia is launched" },
		{ year: 2001, name: "iPod Released", description: "Apple releases the first iPod" },
		// Add more events as needed
	];

	let timeline = [];
	let availableEvents = [];
	let currentEvent = null;
	let gameOver = false;

	function startGame() {
		timeline = [];
		availableEvents = [...events].sort(() => Math.random() - 0.5);
		gameOver = false;
		nextEvent();
	}

	function nextEvent() {
		if (availableEvents.length > 0) {
		const randomIndex = Math.floor(Math.random() * availableEvents.length);
		currentEvent = availableEvents[randomIndex];
		availableEvents = availableEvents.filter((_, index) => index !== randomIndex);
		} else {
		gameOver = true;
		currentEvent = null;
		}
	}

	function handleDragStart(event, card) {
		event.dataTransfer.setData('text/plain', JSON.stringify(card));
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(event, index) {
		event.preventDefault();
		const droppedCard = JSON.parse(event.dataTransfer.getData('text'));
		placeEvent(droppedCard, index);
	}

	function placeEvent(event, index) {
		const isCorrectPlacement = 
		(index === 0 || timeline[index - 1].year <= event.year) &&
		(index === timeline.length || timeline[index].year >= event.year);

		if (isCorrectPlacement) {
		timeline = [
			...timeline.slice(0, index),
			event,
			...timeline.slice(index)
		];
		nextEvent();
		} else {
		gameOver = true;
		}
	}

	startGame();
</script>
<main>
	<h1>Timeline Game</h1>
	<div class="timeline-container">
	  <div class="timeline">
		<div class="drop-zone" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, 0)}></div>
		{#each timeline as event, index (event.name)}
		  <div class="timeline-item">
			<div class="card placed">
			  <h3>{event.year}</h3>
			  <h4>{event.name}</h4>
			  <p>{event.description}</p>
			</div>
			<div class="drop-zone" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, index + 1)}></div>
		  </div>
		{/each}
	  </div>
	</div>
	
	<h2 style="text-align: center;">Current Event</h2>
	{#if currentEvent}
	  <div 
		class="card current-event" 
		draggable="true"
		on:dragstart={(e) => handleDragStart(e, currentEvent)}
	  >
		<h4>{currentEvent.name}</h4>
		<p>{currentEvent.description}</p>
	  </div>
	{:else}
	  <p style="text-align: center;">No more events</p>
	{/if}
  
	{#if gameOver}
	  <div class="game-over">
		<h2>{availableEvents.length === 0 && timeline.length === events.length ? 'Congratulations! You won!' : 'Game Over!'}</h2>
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
  
	.available-events {
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