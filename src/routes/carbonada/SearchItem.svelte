<script lang="ts">
  import { currentItem, loading, carbonada } from './stores';
  import type { Item} from './types';
  import { placeItem } from './carbonadaLogic';
  import { get } from 'svelte/store';
  import searchIcon from '$lib/assets/lupa.png';


  let searchQuery = '';
  let alreadyExists = false;



  function handleSearch(event: Event) {
    searchQuery = (event.target as HTMLInputElement).value;
  }

  async function fetchSearchResults(product: string) {

    loading.set(true);
    try {
      const response = await fetch('/api/mock', { //https://aastroza--carbonada-estimate.modal.run
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const item: Item = await response.json();
      currentItem.set(item);
      placeItem(item);
      console.log({ item })
      searchQuery = '';
      // Handle the search results as needed
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      loading.set(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    alreadyExists = false
    if (event.key === 'Enter') {
      const currentCarbonadaItems = get(carbonada).map(i => i.product.toLowerCase())
      if(currentCarbonadaItems.includes(searchQuery.toLowerCase())) {
        alreadyExists = true
      } else {
        fetchSearchResults(searchQuery);
      }
    }
  }

</script>

<div class="search-container">
  {#if alreadyExists}
    <p class="error">El item ya está en la Carbonada</p>
  {/if}
  <div class="search-bar">
    {#if $loading}
      <div class="loading-indicator">Cargando...</div>
    {:else}
      <img src={searchIcon} alt="Search" class="icon" />
      <input
        type="text"
        placeholder="Busca un item..."
        on:input={handleSearch}
        on:keydown={handleKeyDown}
        bind:value={searchQuery}
      />
    {/if}
  </div>
</div>


<style>
  .search-container {
    position: relative;
    margin-bottom: 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
  }
  
  .search-bar {
    position: relative;
    width: 100%;
    max-width: 400px;
    
  }

  .search-bar input {
    width: 100%;
    padding: 0.5rem 0rem 0.5rem 0.5rem;
    border: 3px solid #000;
  }

  .search-bar .icon {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    width: 1rem; 
    height: 1rem; 
  }

  .loading-indicator {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    color: #ffffff;
  }

  .error {
    font-size: 16px;
    color: red;
    text-shadow: 
      -2px -2px 0 #fff,  
       2px -2px 0 #fff,
      -2px  2px 0 #fff,
       2px  2px 0 #fff;
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }
</style>