<template>
    <div class="arena-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
        <button class="home-button" @click="goHome">🏠 Home</button>
      </header>
      <section v-if="inGame" class="arena-controls">
        <h1>Arena Controls</h1>
        <div class="control-buttons">
          <button @click="move">Move</button>
          <button @click="changeDirection('NORTH')">North</button>
          <button @click="changeDirection('EAST')">East</button>
          <button @click="changeDirection('SOUTH')">South</button>
          <button @click="changeDirection('WEST')">West</button>
          <button @click="attack">Attack</button>
          <button @click="leaveGame">Leave Game</button>
        </div>
        <div class="logs">
          <h2>Game Logs</h2>
          <ul>
            <li v-for="log in logs" :key="log.id">{{ log.message }}</li>
          </ul>
        </div>
      </section>
      <section v-else class="enter-game">
        <h1>Enter Arena</h1>
        <button @click="enterGame">Enter Game</button>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inGame: false,
        gameId: null,
        logs: [],
        token: localStorage.getItem('token'),
      };
    },
    methods: {
      async enterGame() {
        try {
          const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/${this.gameId}/play`, null, {
            headers: {
              'Bearer': `${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200 || response.status === 204) {
            this.inGame = true;
            this.fetchLogs();
          }
        } catch (error) {
          console.error('Error entering game:', error);
        }
      },
      async leaveGame() {
        try {
          const response = await axios.delete(`https://balandrau.salle.url.edu/i3/arenas/${this.gameId}/play`, {
            headers: {
              'Bearer': `${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 204) {
            this.inGame = false;
            this.logs = [];
          }
        } catch (error) {
          console.error('Error leaving game:', error);
        }
      },
      async move() {
        try {
          const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/move`, null, {
            headers: {
              'Bearer': `${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
            this.fetchLogs();
          }
        } catch (error) {
          console.error('Error moving:', error);
        }
      },
      async changeDirection(direction) {
        try {
          const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/direction`, { direction }, {
            headers: {
              'Bearer': `${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
            this.fetchLogs();
          }
        } catch (error) {
          console.error(`Error changing direction to ${direction}:`, error);
        }
      },
      async attack() {
        try {
          const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/attack/${this.gameId}`, null, {
            headers: {
              'Bearer': `${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 200) {
            this.fetchLogs();
          }
        } catch (error) {
          console.error('Error attacking:', error);
        }
      },
      async fetchLogs() {
        try {
          const response = await axios.get(`https://balandrau.salle.url.edu/i3/arenas/${this.gameId}/logs`, {
            headers: {
              'Bearer': `${this.token}`,
              'Accept': 'application/json'
            }
          });
          if (response.status === 200) {
            this.logs = response.data;
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },
      goBack() {
        this.$router.push('/Store');
      },
      goHome() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .arena-page {
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
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
    color: #fff;
    width: 100%;
    text-align: left;
  }
  
  .back-button,
  .home-button {
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
    margin-left: 10px;
  }
  
  .arena-controls, .enter-game {
    background-color: #333;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: 80%;
    text-align: center;
    color: #ffd700;
  }
  
  .control-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    margin-bottom: 2em;
  }
  
  .control-buttons button {
    padding: 1em 2em;
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 1.2em;
  }
  
  .logs {
    max-height: 300px;
    overflow-y: auto;
    text-align: left;
  }
  
  .logs ul {
    list-style: none;
    padding: 0;
  }
  
  .logs li {
    background-color: #222;
    padding: 1em;
    margin: 0.5em 0;
    border-radius: 5px;
    color: #ffd700;
  }
  </style>
  