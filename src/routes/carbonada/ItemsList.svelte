<script lang="ts">
    import { carbonada } from './stores';
    import { slide } from 'svelte/transition';
    let isOpen = true;
</script>

<div class="items-list-container">
    <button class="toggle-button" on:click={() => isOpen = !isOpen}>
        {isOpen ? '►' : '◄'}
    </button>
    {#if isOpen}
        <div class="items-dropped-list" transition:slide={{duration: 300, axis: "x"}}>
            <h4>Carbon footprint of dropped Items</h4>
            <ul>
                {#each $carbonada as item (item.product)}
                    <li>
                        <b>{item.product}</b>: {item.carbon_footprint.toFixed(2)} CO2e
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style>
    .items-list-container {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
    }

    .toggle-button {
        align-self: center;
        background-color: #f0f0f0;
        border: none;
        padding: 10px;
        cursor: pointer;
    }

    .items-dropped-list {
        width: 250px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: #f9f9f9;
        border-left: 1px solid #ddd;
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
</style>
