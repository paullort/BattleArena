<template>
    <main class="player-management-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="management-container">
        <h1>PLAYER MANAGEMENT</h1>
        <button class="management-button" @click="showPlayerInfo">PLAYER INFO</button>
        <button class="management-button" @click="deletePlayer">DELETION</button>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navega de vuelta a la pantalla del menú principal
        this.$router.push('/MainMenu');
      },
      showPlayerInfo() {
        // Navega a la pantalla de información del jugador
      },
      deletePlayer() {
        // Navega a la pantalla de eliminación de jugador
      }
    }
  }
  </script>
  
  <style>
  .player-management-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/player-management-background.jpg'); /* Ajusta la ruta a tu imagen */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
  }
  
  .back-button {
    padding: 0.5em 1em;
    background-color: #ffd700; /* Color de fondo amarillo para que coincida con la imagen */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .management-container h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  
  .management-button {
    background-color: #ffd700; /* Color de fondo amarillo para los botones */
    color: black;
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  
  .management-button:hover {
    background-color: #ffea00; /* Color de fondo al hacer hover */
  }
  
  @media (max-width: 768px) {
    .management-button {
      padding: 0.5em 1em;
      font-size: 1em;
    }
  }
  </style>
  