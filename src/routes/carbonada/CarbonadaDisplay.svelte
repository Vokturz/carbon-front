<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { carbonada } from './stores';
    import ProgressBar from './ProgressBar.svelte';
    import type { Item } from './types';

    let items: Item[] = [];
    carbonada.subscribe(value => {
        items = value;
    });

    function getRandomPosition() {
        return {
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`
        };
    }

    function getRandomDelay() {
        return Math.random() * 2;
    }
</script>

<div class="carbonada-container">
    <div class="carbonada">
        <div class="pot-container">
            <div class="pot">
                {#if items.length > 0}
                    {#each items as item}
                        <div class="floating-item" 
                             style="top: {getRandomPosition().top}; 
                                    left: {getRandomPosition().left}; 
                                    animation-delay: {getRandomDelay()}s;">
                            {item.product}
                        </div>
                    {/each}
                {:else}
                    <p>No items in the pot</p>
                {/if}
            </div>
            <ProgressBar />
        </div>
    </div>
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
        overflow-x: hidden;
        display: flex;
        align-items: stretch;
        min-height: 200px;
        justify-content: center;
    }

    .pot {
        background-color: #c6dee7;
        border: 2px solid #a2b9cc;
        position: relative;
        width: 30vw; /* Use viewport width for responsiveness */
        max-width: 500px; /* Maximum width to prevent it from getting too large */
        height: 40vh; /* Use viewport height for responsiveness */
        max-height: 200px; /* Maximum height to prevent it from getting too large */
        color: #333;
        font-style: italic;
        overflow: hidden;
    }

    .pot-container {
        position: relative;
        display: flex;
        align-items: center;
    }

    .floating-item {
        position: absolute;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 5px;
        font-size: 1.4vw; 
        font-size: 14px;
        animation: float 5s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-10px) rotate(2deg);
        }
        50% {
            transform: translateY(0px) rotate(0deg);
        }
        75% {
            transform: translateY(10px) rotate(-2deg);
        }
        100% {
            transform: translateY(0px) rotate(0deg);
        }
    }
</style>
