<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let numberOfPlayers = 1;

  function handleStart() {
    dispatch('start', { numberOfPlayers });
  }
</script>

<div class="onboarding">
  <div class="column">
      <div class="content">
          <h2>¡Bienvenido a Carbonada!</h2>
          <p>Este es un juego multijugador donde tu misión es agregar cosas a la carbonada sin pasar el límite de huella de carbono. ¿Cómo se juega?</p>
          <h3>Agrega cosas:</h3>
          <p>En tu turno, escribe algo que quieras añadir (como “una Coca-Cola” o “una noche en un hotel”). Cada cosa suma huella de carbono a la olla.</p>
          <h3>No te pases del límite:</h3>
          <p>Asegúrate de que la huella de carbono total no supere el límite máximo.</p>
          <h3>Evita que explote:</h3>
          <p>Si te pasas del límite, la carbonada explota y pierdes.</p>
          <p>¡Piensa bien y diviértete jugando!</p>
      </div>
  </div>
  <div class="column">
      <div class="content">
          <h3>¿Qué es la huella de carbono?</h3>
          <p>La huella de carbono mide cuánto afectan nuestras acciones al clima del planeta. Todo lo que hacemos, compramos o usamos deja una huella, que es la cantidad de gases que calientan la Tierra. En este juego, debes evitar que la huella de carbono sea demasiado grande para que la carbonada no explote.</p>
          <p>Es importante cuidar nuestra huella de carbono porque, al hacerla más pequeña, ayudamos a proteger el planeta y a tener un futuro mejor.</p>
          <div class="player-selection">
            <p></p><label for="playerCount">Número de Jugadores:</label>
            <div class="pixel-select-wrapper">
              <select id="playerCount" bind:value={numberOfPlayers} class="pixel-select">
                {#each Array(4) as _, i}
                  <option value={i + 1}>{i + 1}</option>
                {/each}
              </select>
            </div>
            <button class="pixel-button" on:click={handleStart}>Jugar</button>
        </div>
        </div>
  
  </div>
</div>



<style>
  .onboarding {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      color: white;
      font-family: 'Press Start 2P', cursive;
  }

  .onboarding p, h2, h3 {
    text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
  }

  .column {
      width: 45%;
      padding: 5px;
  }
  .content {
      padding: 20px;
      margin-top: 15%;
      width: 100%;
      height: auto; /* Adjust height as needed */
      background-color: rgba(175, 114, 0, 0.637);
      border: 8px solid #000;
      box-shadow: 0 0 0 4px #fff, 0 0 0 8px #000;
      display: flex;
      flex-direction: column;
  }
  .player-selection {
      margin-top: 20px;
      text-align: center;
      color: white;
      text-shadow: 
      -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px  1px 0 #000,
      1px  1px 0 #000;
  }
  .pixel-select-wrapper {
      display: inline-block;
      position: relative;
      margin: 0 10px;
  }
  .pixel-select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #fff;
      border: 4px solid #000;
      padding: 5px 30px 5px 10px;
      font-family: 'Press Start 2P', cursive;
      font-size: 16px;
      color: #000;
      cursor: pointer;
  }
  .pixel-select-wrapper::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #fff;
      pointer-events: none;
  }
  .pixel-button {
      background-color: #4CAF50;
      border: 4px solid #2E7D32;
      color: white;
      padding: 10px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      font-family: 'Press Start 2P', cursive;
      box-shadow: 0 4px #1B5E20;
      transition: all 0.1s ease-in-out;
  }
  .pixel-button:active {
      box-shadow: 0 2px #1B5E20;
      transform: translateY(2px);
  }

  @media (max-width: 768px) {
    .onboarding {
      margin-top: 15%;
      flex-direction: column;
    }
    .column {
      width: 90%;
      margin-bottom: -10px;
    }
    .content {
      margin-top: 5%;
      padding: 10px;
    }
    h2, h3 {
      font-size: 1.2em;
    }
    p {
      font-size: 0.9em;
    }
    .pixel-select, .pixel-button {
      font-size: 14px;
    }
  }
</style>
