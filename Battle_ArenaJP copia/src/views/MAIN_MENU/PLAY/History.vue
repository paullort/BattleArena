<template>
    <main class="history-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <h1>HISTORY</h1>
      <aside class="win-percentage">
        <p>64% WON</p>
      </aside>
      <section class="game-history">
        <ul>
          <!-- Repetir per cada partida jugada -->
          <li>
            <span>(View game replay)</span>
            <button @click="viewReplay">SEE</button>
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
        this.$router.push('/Pasarela-play');
      },
      viewReplay(gameId) {
        
        console.log('Viewing replay for game:', gameId);
      }
    }
  }
</script>
  
<style scoped>
  .history-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/history-background.jpg'); 
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
    border-radius: 5px;
    cursor: pointer;
  }
  
  .win-percentage {
    background-color: yellow;
    border: 2px solid red; 
    padding: 0.5em;
    margin: 1em;
  }
  
  .game-history ul {
    list-style: none;
    padding: 0;
  }
  
  .game-history li {
    margin-bottom: 1em;
  }
  
  .game-history button {
    background-color: #ffd700; 
    border: none;
    border-radius: 5px;
    padding: 0.5em 1em;
    cursor: pointer;
  }
  
  .game-history button:hover {
    background-color: #ffea00; 
  }
  
  @media (max-width: 768px) {
    .game-history button {
      padding: 0.5em;
      font-size: 0.8em;
    }
  }
</style>
