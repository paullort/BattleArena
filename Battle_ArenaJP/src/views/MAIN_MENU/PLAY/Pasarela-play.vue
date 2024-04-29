<template>
  <main class="pasarela-play">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="menu-container">
      <h1>PLAY</h1>
      <nav class="menu-items">
        <button @click="availableGames">Available Games</button>
        <button @click="createGame">Create Game</button>
        <button @click="viewHistory">View History</button>
      </nav>
    </section>
  </main>
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/MainMenu');
      },
      goHome() {
        this.$router.push('/'); // or any other route you want to navigate to
      },
      availableGames() {
        this.$router.push('/JoinAvailableGames');
      },
      createGame() {
        this.$router.push('/CreateGame');
      },
      viewHistory() {
        this.$router.push('/History');
      }
    }
  }
</script>

<style scoped>
 .pasarela-play {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/IMATGESFONS/blue.png'); 
    height: 100vh;
    width: 100vw;
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
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 1.2em;
  }
 .home-button {
    padding: 0.5em 1em;
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 1.2em;
    margin-left: 10px; /* add some margin to separate from the back button */
  }
  
 .menu-container h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    font-size: 3.5em;
    font-family: sans-serif;
  }
  
 .menu-items {
    display: flex;
    flex-direction: column; 
    width: 100%;
  }
  
 .menu-items button {
    background-color: #ffd700; 
    color: black;
    margin: 10px;
    padding: 20px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1.5rem;
    font-weight:500;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  
 .menu-items button:hover {
    background-color: #ffea00; 
  }
  
  @media (max-width: 768px) {
   .menu-items button {
      padding: 0.5em 1em;
      font-size: 1em;
    }
  }
</style>