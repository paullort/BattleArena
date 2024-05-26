<template>
  <main class="ranking-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="players-list">
      <h1>Ranking</h1>
    <SearchBar @search-updated="filterPlayers" />
    <PlayerList :players="filteredPlayers" :errorMessage="errorMessage" />
  </section>
  </main>
</template>

<script>
import axios from 'axios';
import SearchBar from '../../../components/icons/SearchBar.vue';
import PlayerList from '../../../components/icons/PlayerList.vue';

export default {
  components: {
    SearchBar,
    PlayerList
  },
  data() {
    return {
      players: [],
      filteredPlayers: [],
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  methods: {
    
    goBack() {
      this.$router.push('/MainMenu');
    },
    goHome() {
      this.$router.push('/');
    },
    async fetchPlayers() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://balandrau.salle.url.edu/i3/players', {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
          this.players = response.data;
          this.filteredPlayers = response.data;
        } else {
          this.errorMessage = 'Error: La respuesta no contiene datos JSON';
        }
      } catch (error) {
        this.errorMessage = 'Error fetching players: ' + error.message;
      }
    },
    filterPlayers(searchTerm) {
      if (!searchTerm) {
        this.filteredPlayers = this.players;
      } else {
        this.filteredPlayers = this.players.filter(player =>
          player.player_ID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
  }
}
</script>

<style scoped>


header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  color: #fff;
  width: 100%;
  text-align: left;
}

h1{
  margin-bottom: 1em;
  font-size: 3em;
  color: yellow;
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
    margin-left: 10px; 
  }

  .players-list{
    padding: 2em;
    background-color: #333;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: 80%;
    height: 85%;
    margin: 0 auto;
    text-align: center;
    overflow-y:auto;
  }

  .players-list::-webkit-scrollbar {
  display: none;
}
.players-list {
  -ms-overflow-style: none;
}
.players-list {
  scrollbar-width: none;
}
.ranking-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/IMATGESFONS/blue.png');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>