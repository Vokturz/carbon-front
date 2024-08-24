<script>
    import { carbonada } from './stores';
</script>

<div class="cards-dropped-list">
    <h4>Carbon footprint of dropped Items</h4>
    <ul>
        {#each $carbonada as card (card.name)}
            <li>
                <b>{card.name}</b>: {card.carbonFootprint.toFixed(2)} CO2e
            </li>
        {/each}
    </ul>
</div>

<style>

    .cards-dropped-list {
            position: absolute;
            left: 10px;
            top: 10px;
            bottom: 0;
            width: 20%;
            display: flex;
            flex-direction: column;
            padding: 50px;
            /* background-color: #f9f9f9; */
            border-right: 1px solid #ddd;
            overflow-y: auto;
            z-index: 1;
        }

    .cards-dropped-list h4 {
        margin-top: 0;
        margin-bottom: 10px;
    }

    .cards-dropped-list ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .cards-dropped-list li {
        margin-bottom: 5px;
        font-size: 14px;
    }

</style>

