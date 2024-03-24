<template>
    <main class="ranking-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
        <h1>RANKING</h1>
      </header>
      <section class="search-section">
        <input type="text" placeholder="search bar" aria-label="Search players">
        <button @click="sortPlayers">sort</button>
      </section>
      <section class="ranking-list">
        <ul>
          <li>#1 (id jugador) (pointsXP)</li>
          <li>#2 (id jugador) (pointsXP)</li>
          <!-- Repite para más jugadores -->
        </ul>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navigate back to the player management screen
        this.$router.push('/MainMenu');
      },
      sortPlayers() {
        // Logic to sort players
      }
    }
  }
  </script>
  
  <style scoped>
  .ranking-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/IMATGESFONS/blue.png'); /* Asegúrate de que la ruta a la imagen es correcta */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header h1{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0px;
    width: 100vw;
    font-size: 90px;
    display: flex;
    justify-content: space-between;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-top: 100px;

  }
  .back-button {
    padding: 0.5em 1em;
    background-color: #ffd700; /* Color de fondo amarillo para coincidir con la imagen */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .search-section {
    display: flex;
    justify-content: center;
    width: 100vw;
    display: flex;
    flex-direction: vert column;
  }
  
  .search-section input {
    padding: 0.5em;
    padding-right: 200px;
    margin-right: 0.5em;
  }
  
  .search-section button {
    padding: 0.5em 1em;
    background-color: #ffd700; /* Color de fondo amarillo para el botón */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .ranking-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .ranking-list li {
    background-color: #ffffff; /* Fondo blanco para la lista de jugadores */
    margin: 0.5em 0;
    padding: 0.5em;
    border-radius: 5px;
  }
  
  @media (max-width: 768px) {
    .ranking-list li {
      padding: 0.5em;
    }
  }
  </style>
  