<script lang="ts">
  import { onMount } from 'svelte';
  import { currentItem, loading } from './stores'; // Adjust the import path as necessary
  import type { Item } from './types';
  import { placeItem } from './carbonadaLogic';

  let searchQuery = '';

  function handleSearch(event: Event) {
    searchQuery = (event.target as HTMLInputElement).value;
  }

  async function fetchSearchResults(product: string) {

    loading.set(true);
    try {
      const response = await fetch('/api/mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const item: Item = await response.json();
      currentItem.set(item);
      placeItem(item);
      searchQuery = '';
      // Handle the search results as needed
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      loading.set(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      fetchSearchResults(searchQuery);
    }
  }

</script>

<div class="search-container">
  <div class="search-bar">
    <i class="fas fa-search icon"></i>
    {#if $loading}
    <div class="loading-indicator">Loading...</div>
    {:else}
    <input
      type="text"
      placeholder="Search for a item..."
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
    margin-bottom: 6rem;
    display: flex;
    justify-content: center;
  }
  
  .search-bar {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  .search-bar input {
    width: 100%;
    padding: 0.5rem 0rem 0.5rem 0.5rem; /* Adjust padding for icon */
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .search-bar .icon {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    color: #888;
  }

  .loading-indicator {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    color: #888;
  }
</style>