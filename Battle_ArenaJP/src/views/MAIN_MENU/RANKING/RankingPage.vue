<template>
  <main class="ranking-page">
    <SearchBar @search-updated="filterPlayers" />
    <PlayerList :players="filteredPlayers" :errorMessage="errorMessage" />
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