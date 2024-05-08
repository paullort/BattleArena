<template>
  <main class="join-games-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="games-list">
      <h1>Available Games</h1>
      <p>Here are available games to Join</p>
      <ul>
        <li v-for="(game, index) in games" :key="index">
          <span>{{ game.game_ID }}</span> <!-- Assuming game_ID is the unique identifier -->
          <button @click="joinGame(game.game_ID)" :disabled="joiningGame">
            {{ joiningGame ? 'Joining...' : 'JOIN' }}
          </button>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      games: [],
      joiningGame: false,
    };
  },
  created() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
  try {
    const response = await axios.get('http://balandrau.salle.url.edu/arenas', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    });
    this.games = response.data; // Cambiar response por response.data
  } catch (error) {
    console.error('Error fetching games:', error);
  }
},
    goBack() {
      this.$router.push('/Pasarela-play');
    },
    goHome() {
      this.$router.push('/');
    },
    joinGame(gameId) {
      this.joiningGame = true;
      console.log('Joining game:', gameId);
      // Add your game joining logic here
      setTimeout(() => {
        this.joiningGame = false;
      }, 2000); // Simulate a 2-second delay
    },
  },
};
</script>

<style scoped>
.join-games-page {
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

.games-list {
  padding: 2em;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.games-list h1 {
  color: #ffd700;
  margin-bottom: 0.5em;
  font-size: 3em;
  font-weight: bold;
}

.games-list p {
  color: #ffd700;
  font-size: 1.5em;
  margin-bottom: 2em;
}

.games-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

.games-list li {
  margin-bottom: 1em;
  padding: 1em;
  border-bottom: 1px solid #44c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.games-list li:last-child {
  border-bottom: none;
}

.games-list button {
  padding: 0.5em 1em;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #433;
  font-weight: bold;
  font-size: 1em;
}

.games-list button:hover {
  background-color: #ffd700;
}

.games-list button:disabled {
  background-color: green;
  cursor: not-allowed;
}

@media (max-width: 768px) {
 .games-list {
    width: 90%;
  }
 .games-list button {
    padding: 0.5em;
    font-size: 1.2em;
  }
}
</style>