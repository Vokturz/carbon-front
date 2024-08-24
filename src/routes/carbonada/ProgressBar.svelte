<script>
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { progress, gameState } from './stores';

    const tweenedProgress = tweened(0, {
		duration: 400, // Duration of the animation in milliseconds
		easing: cubicOut
	});

    progress.subscribe(value => {
		tweenedProgress.set(value);
	});
</script>

<div class="progress-container">
    <p>{$gameState.currentCO2e.toFixed(2)}</p>
    <progress value={$tweenedProgress}></progress>
    <p class="legend">CO2e</p>
</div>

<style>
    .progress-container {
		position: absolute;
		right: -50px;
		top: 0;
		bottom: 0;
		width: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.progress-container p {
        margin: 0;
        padding: 5px;
        text-align: center;
        font-size: 16px;
    }
	.progress-container progress {
	  width: 100%;
	  /* height: auto; */
	  -webkit-appearance: none;
	  appearance: none;
	  writing-mode: vertical-lr; 
	  transform: rotate(180deg); 
	}
  
	/* Webkit styles for the progress bar */
	.progress-container progress::-webkit-progress-bar {
	  background-color: #f0f0f0;
	  border-radius: 10px;
	}
  
	.progress-container progress::-webkit-progress-value {
	  background-color: #4CAF50;
	  border-radius: 10px;
	}
  
	/* Firefox styles for the progress bar */
	.progress-container progress::-moz-progress-bar {
	  background-color: #4CAF50;
	  border-radius: 10px;
	}
  
    .progress-container .legend {
        margin-top: 5px;
        font-size: 16px;
        text-align: center;
        transform: rotate(-90deg);
        transform-origin: right center;
        position: absolute;
        top: 30%;
        white-space: nowrap;
    }
</style>