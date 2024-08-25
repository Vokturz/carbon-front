<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { carbonada } from './stores';
    import ProgressBar from './ProgressBar.svelte';
    import type { Item, Category } from './types';
    import comida from '$lib/assets/comida.png';
    import otros from '$lib/assets/otros.gif';
    import servicios from '$lib/assets/servicios.png';
    import tecnologia from '$lib/assets/tecnologia.png';
    import vidaCotidiana from '$lib/assets/vida-cotidiana.png';


    let items: Item[] = [];
    carbonada.subscribe(value => {
        items = value;
    });

    const categoryMap: Record<Category, string> = {
        'comida': comida,
        'vida cotidiana': vidaCotidiana,
        'servicios': servicios,
        'tecnología': tecnologia,
        'otros': otros
    };

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
    <div class="background">
        <div class="pot-container">
            <div class="pot">
                {#if items.length > 0}
                    {#each items as item}
                    <div class="floating-item" 
                            style=" top: {getRandomPosition().top}; 
                                    left: {getRandomPosition().left}; 
                                    animation-delay: {getRandomDelay()}s;">
                        <img src={categoryMap[item.category]} alt={item.category} class="category-icon">

                    </div>
                    {/each}
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

    .background {
        background-image: url('$lib/assets/pot-background.gif');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding-bottom: 40%; /* (193 / 174) * 100% */
        width: 40%;
        max-width: 696px; /* 4 times the original width */
        height: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        image-rendering: pixelated;
    }

    .pot-container {
        position: absolute; /* Change from relative to absolute */
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%); /* Adjust for exact centering */
        display: flex;
        align-items: center;
    }

    .pot {
        position: relative;
        width: 15vw;
        max-width: 500px;
        height: 20vh;
        max-height: 200px;
        color: #333;
        font-style: italic;
        overflow: hidden;
        margin-top: 60%;
    }

    .floating-item {
        position: absolute;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 50% 50% ;
        font-size: 1.4vw; 
        font-size: 14px;
        animation: float 5s ease-in-out infinite;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .category-icon {
        width: 30px;
        height: 30px;
        object-fit: contain;
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

    @media (max-width: 768px) {
        .pot {
            margin-top: 80%;
            height: 10vh;
            width: 20vw;
        }

        .background {
            padding-bottom: 60%; 
            width: 60%;
            max-width: 900px;
        }
    }
</style>
