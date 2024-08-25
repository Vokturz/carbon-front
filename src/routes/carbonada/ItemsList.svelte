<script lang="ts">
    import { carbonada, gameState } from './stores';
    import { slide } from 'svelte/transition';
    import { categoryMap } from './types';

    let isOpen = false;
    let player = 1;

</script>


<div class="items-list-container">
    <div class="header">
        <button class="toggle-button" on:click={() => isOpen = !isOpen}>
            {isOpen ? '▼ Lista de items' : '▲ Lista de items'}
        </button>

    </div>
    {#if isOpen}
        <div class="items-dropped-list" transition:slide={{duration: 300, axis: "y"}}>
            <h4>Huella de carbono en kg CO2e</h4>
            <ul>
                {#each $carbonada as item, index (item.product)}
                {@const playerIndex = Math.floor(index  %  $gameState.playerScores.length)}
                    <li>
                        <img src={categoryMap[item.category]} alt={item.category} class="category-icon">
                        <span>(Jugador {playerIndex + 1})<br><b>{item.product}</b>: {item.carbon_footprint.toFixed(1)} kg CO2e</span>
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

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .toggle-button {
        flex-grow: 1;
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
        padding: 10px;
    }

    .items-dropped-list h4 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 10px;
    }

    .items-dropped-list ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .items-dropped-list li {
        margin-bottom: 5px;
        font-size: 10px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .category-icon {
        width: 15px;
        height: 15px;
        object-fit: contain;
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
