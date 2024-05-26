<template>
  <main class="join-games-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="games-list">
      <h1>Available Games</h1>
      <p>Here are available games to Join</p>
      <div class="search-bar">
      <input type="text" v-model="searchTerm" @input="filterGames" placeholder="Buscar juegos...">
    </div>
      <ul>
        <li v-for="(game, index) in filteredGames" :key="index">
          <span>{{ game.game_ID }}</span>
          <span v-for="(playerg, k) in game.players_games" :key="k">
            {{ playerg.player_ID }}
          </span>
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
      filteredGames: [],
      joiningGame: false,
      searchTerm: '',
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://balandrau.salle.url.edu/i3/arenas', {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        this.games = response.data;
        this.filteredGames = response.data;
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    filterGames() {
      if (!this.searchTerm) {
        this.filteredGames = this.games;
      } else {
        this.filteredGames = this.games.filter(game =>
          game.game_ID.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },
    goBack() {
      this.$router.push('/Pasarela-play');
    },
    goHome() {
      this.$router.push('/');
    },
    async joinGame(gameId) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/${gameId}/play`, 
        {
          path: {
            id: gameId, 
          }
          },
        {
          headers: {
            'Bearer': `${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          this.logs = response.data;
          console.log(this.logs);
          this.$router.push('/InGame');
        }
      } catch (error) {
        console.error('Error entering game:', error);
      }
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
  height: 80%;
  margin: 0 auto;
  text-align: center;
  overflow-y:auto;
}
.games-list::-webkit-scrollbar {
  display: none;
}
.games-list {
  -ms-overflow-style: none;
}
.games-list {
  scrollbar-width: none;
}

.search-bar input{
  width: 40em;
  height: 3em;
  margin-bottom: 2em;
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