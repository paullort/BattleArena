<template>
  <main class="ranking-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="ranking-list">
      <ul>
        <li v-for="(player, index) in players" :key="player.player_ID">
          <span class="rank">{{ index + 1 }}</span>
          <span class="player-name">{{ player.name }}</span>
          <span class="player-xp">{{ player.xp }} XP</span>
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
      players: []
    }
  },
  mounted() {
    // Hacer la solicitud a la API cuando el componente se monte
    this.fetchPlayers();
  },
  methods: {
    goBack() {
      this.$router.push('/MainMenu');
    },
    fetchPlayers() {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      // Hacer la solicitud GET a la API para obtener los jugadores
      axios.get('/players', {
        headers: {
          Bearer: token, // diu dani "Bearer" en contes de "Authorization"
            'Content-Type': 'application/json',
        }
      })
      .then(response => {
        // Almacenar los datos de los jugadores en el estado del componente
        this.players = response.data;
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
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

.h1 {
  font-size: 36px;
  color: #fff;
  text-align: center;
  margin-top: 20px;
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

.search-section {
  display: flex;
  justify-content: center;
  width: 100vw;
  margin-top: 20px;
}

.search-section input {
  padding: 0.5em;
  padding-right: 200px;
  margin-right: 0.5em;
  border: none;
  border-radius: 5px;
  font-size: 18px;
}

.search-section button {
  padding: 0.5em 1em;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.ranking-list {
  margin-top: 20px;
}

.ranking-list ul {
  list-style-type: none;
  padding: 0;
}

.ranking-list li {
  background-color: #fff;
  margin: 0.5em 0;
  padding: 0.5em;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.ranking-list li span {
  display: inline-block;
  margin-right: 10px;
}

.rank {
  font-weight: bold;
  color: #666;
}

.player-name {
  font-size: 18px;
  color: #333;
}

.player-xp {
  font-size: 16px;
  color: #999;
}

@media (max-width: 768px) {
 .ranking-list li {
    padding: 0.5em;
  }
}
</style>