<template>
    <main class="join-games-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="games-list">
        <h1>Available Games</h1>
        <p>Here are available games to Join</p>
        <ul>
          <li>
            <span>Game 1  </span>
            <button @click="joinGame(1)">JOIN</button>
          </li>
          <!-- Repetir per a  cada partida disponible -->
          <li>
            <span>Game 2  </span>
            <button @click="joinGame(2)">JOIN</button>
          </li>
          <!-- ... -->
        </ul>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navega pantalla anterior
        this.$router.push('/Pasarela-play');
      },
      joinGame(gameId) {
        
        console.log('Joining game:', gameId);
        
      }
    }
  }
  </script>
  
  <style scoped>
  .join-games-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/join-games-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
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
  }
  
  .games-list h1 {
    color: #ffd700; 
    margin-bottom: 1em;
  }
  
  .games-list ul {
    list-style: none;
    padding: 10px;
  }
  
  .games-list li {
    margin-bottom: 1em;
    
  }
  
  .games-list button {
    padding: 0.5em 1em;
    background-color: #ffd700; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
  }
  
  .games-list button:hover {
    background-color: #ffea00; 
  }
  
  @media (max-width: 768px) {
    .games-list button {
      padding: 0.5em;
      font-size: 0.8em;
      
    }
  }
  </style>
  