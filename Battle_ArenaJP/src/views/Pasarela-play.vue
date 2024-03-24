<template>
    <main class="pasarela-play">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="buttons-container">
        <h1>PLAY</h1>
        <button @click="availableGames">Available Games</button>
        <button @click="createGame">Create Game</button>
        <button @click="viewHistory">View History</button>
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
      availableGames() {
        // Logic for showing available games
        this.$router.push('/JoinAvailableGames');

      },
      createGame() {
        // Logic for creating a new game
        this.$router.push('/CreateGame');

      },
      viewHistory() {
        // Logic for viewing game history
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
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/IMATGESFONS/blue.png');
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
    background-color: #ffd700; /* Yellow background color to match the buttons */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .buttons-container h1 {
    color: white;
    font-size: 100px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  
  section button {
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
  
  section button:hover {
    background-color: #ffea00; /* Color on hover */
  }
  
  @media (max-width: 768px) {
    section button {
      padding: 0.5em 1em;
      font-size: 1em;
    }
  }
</style>
  