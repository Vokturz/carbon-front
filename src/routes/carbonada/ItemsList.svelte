<script lang="ts">
    import { carbonada, gameState } from './stores';
    import { slide } from 'svelte/transition';
    let isOpen = true;
    let player = 1;
</script>

<div class="items-list-container">
    <button class="toggle-button" on:click={() => isOpen = !isOpen}>
        {isOpen ? '▼ Items list' : '▲ Items list'}
    </button>
    {#if isOpen}
        <div class="items-dropped-list" transition:slide={{duration: 300, axis: "y"}}>
            <h4>Carbon footprint of dropped Items</h4>
            <ul>
                {#each $carbonada as item, index (item.product)}
                {@const playerIndex = Math.floor(index  %  $gameState.playerScores.length)}
                    <li>
                        (Player {playerIndex + 1}) <b>{item.product}</b>: {item.carbon_footprint.toFixed(2)} CO2e
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style>
    .items-list-container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1000;
    }

    .toggle-button {
        width: 100%;
        background-color: #f0f0f0;
        border: none;
        padding: 10px;
        cursor: pointer;
    }

    .items-dropped-list {
        width: 100%;
        max-height: 50vh;
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: #f9f9f9;
        border-bottom: 1px solid #ddd;
        overflow-y: auto;
    }

    .items-dropped-list h4 {
        margin-top: 0;
        margin-bottom: 10px;
    }

    .items-dropped-list ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .items-dropped-list li {
        margin-bottom: 5px;
        font-size: 14px;
    }

    @media (min-width: 768px) {
        .items-list-container {
            left: auto;
            right: 0;
            top: 0;
            bottom: 0;
            width: 250px;
        }

        .toggle-button {
            width: auto;
        }

        .items-dropped-list {
            height: 100%;
            max-height: none;
            border-left: 1px solid #ddd;
            border-bottom: none;
        }
    }
</style>
