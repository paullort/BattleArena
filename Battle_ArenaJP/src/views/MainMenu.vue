<template>
    <main class="main-menu">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="menu-container">
        <h1>MAIN MENU</h1>
        <nav class="menu-items">
          <button @click="playGame">PLAY</button>
          <button @click="playerManagement">Player Management</button>
          <button @click="listPlayers">List Players</button>
          <button @click="openStore">Store</button>
        </nav>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navigate back to the home page
        this.$router.push('/');
      },
      playGame() {
        // Navigate to the game screen
        this.$router.push('/Pasarela-play');

      },
      playerManagement() {
        // Navigate to the player management screen
        this.$router.push('/PlayerManagement');
      },
      listPlayers() {
        // Navigate to the list players screen
        this.$router.push('/Ranking');
      },
      openStore() {
        // Navigate to the store
        this.$router.push('/Store');
      }
    }
  }
  </script>
  
  <style scoped>
  .main-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/IMATGESFONS/green.png'); /* Adjust the path to your image */
    height: 100vh;
    width: 100vh;
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
    background-color: #ffd700; /* Yellow background color to match the theme */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .menu-container h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  
  .menu-items {
    display: flex;
    flex-direction: column; /* Stack buttons vertically */
    width: 100%; /* Set width to match parent if needed */
  }
  
  .menu-items button {
    background-color: #ffd700; /* Yellow background for buttons */
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
  
  .menu-items button:hover {
    background-color: #ffea00; /* Color on hover */
  }
  
  @media (max-width: 768px) {
    .menu-items button {
      padding: 0.5em 1em;
      font-size: 1em;
    }
  }
  </style>
  