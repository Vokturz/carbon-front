<script lang="ts">
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

$: progressColor = getProgressColor($tweenedProgress);

function getProgressColor(value: number) {
    if (value <= 0.66) return '#00ff00'; // Green
    if (value <= 0.9) return '#ffff00'; // Yellow
    return '#ff0000'; // Red
}
</script>

<div class="progress-container">
    <p>{$gameState.currentCO2e.toFixed(2)}</p>
    <progress value={$tweenedProgress} max="1" style="--progress-color: {progressColor};"></progress>
    <p class="legend">CO2e</p>
</div>

<style>
    .progress-container {
        position: absolute;
        right: -80px;
        top: -20px;
        bottom: 0;
        width: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        image-rendering: pixelated; /* Ensures pixelated rendering */
    }

    .progress-container p {
        margin: 0;
        padding: 5px;
        text-align: center;
        font-size: 16px;
        z-index: 100;
    }

    .progress-container progress {
        width: 100%;
        height: 200px;
        -webkit-appearance: none;
        appearance: none;
        writing-mode: vertical-lr; 
        transform: rotate(180deg); 
        background-color: #f0f0f0;
        border: 2px solid #000; /* Pixelated border */
    }
  
    /* Webkit styles for the progress bar */
    .progress-container progress::-webkit-progress-bar {
        background-color: #f0f0f0;
        border: 2px solid #000; /* Pixelated border */
    }
  
    .progress-container progress::-webkit-progress-value {
        background-color: var(--progress-color);
        transition: none; /* Remove smooth transition */
        border: 2px solid #000; /* Pixelated border */
    }
  
    /* Firefox styles for the progress bar */
    .progress-container progress::-moz-progress-bar {
        background-color: var(--progress-color);
        transition: none; /* Remove smooth transition */
        border: 2px solid #000; /* Pixelated border */
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
