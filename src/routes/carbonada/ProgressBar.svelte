<script lang="ts">
import { cubicOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';
import { progress, gameState } from './stores';

const tweenedProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
});

progress.subscribe(value => {
    tweenedProgress.set(value);
});

$: progressColor = getProgressColor($tweenedProgress);
$: currentCO2e = $gameState.maxCO2e * $tweenedProgress;

function getProgressColor(value: number) {
    if (value <= 0.66) return '#00ff00';
    if (value <= 0.9) return '#ffff00';
    return '#ff0000';
}
</script>

<div class="progress-container">
    <p class="limit">max {$gameState.maxCO2e.toFixed(0)}</p>
    <div class="progress-wrapper">
        <progress value={$tweenedProgress} max="1" style="--progress-color: {progressColor};"></progress>
        <p class="current-value" style="bottom: calc({$tweenedProgress * 100}% - 10px);">
            {currentCO2e.toFixed(0)}
        </p>
    </div>
    <p class="legend">kg CO2e</p>
</div>

<style>
    .progress-container {
        position: fixed;
        right: -150px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        image-rendering: pixelated;
    }

    .progress-wrapper {
        position: relative;
        width: 100%;
        height: 25vh;
    }

    .progress-container p {
        margin: 0;
        padding: 5px;
        text-align: center;
        font-size: 16px;
        z-index: 100;
        color: white;
        text-shadow: 
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px  1px 0 #000,
            1px  1px 0 #000;
    }

    .progress-container progress {
        width: 100%;
        height: 100%;
        -webkit-appearance: none;
        appearance: none;
        writing-mode: vertical-lr; 
        transform: rotate(180deg); 
        background-color: #f0f0f0;
        border: 2px solid #000;
    }

    .current-value {
        position: absolute;
        left: 0%;
        transform: translateX(5px);
    }
  
    /* Webkit styles for the progress bar */
    .progress-container progress::-webkit-progress-bar {
        background-color: #f0f0f0;
        border: 2px solid #000;
    }
  
    .progress-container progress::-webkit-progress-value {
        background-color: var(--progress-color);
        transition: none;
        border: 2px solid #000;
    }
  
    /* Firefox styles for the progress bar */
    .progress-container progress::-moz-progress-bar {
        background-color: var(--progress-color);
        transition: none;
        border: 2px solid #000;
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
        right: -20px;
    }

    @media (max-width: 768px) {
        .progress-container {
            right: 5px;
            margin-top: 20px;
            width: 30px;
            transform: translateX(-50%) rotate(90deg); 
        }

        .progress-container p {
            font-size: 12px;
        }

        .progress-wrapper {
            height: 200px;
        }

        .progress-container .legend {
            font-size: 12px;
        }

        .progress-container .limit {
            transform: rotate(-90deg);
        }

        .current-value {
            transform: translateX(5px) rotate(-90deg);
        }
    }
</style>
