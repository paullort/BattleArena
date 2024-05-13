<template>
  <main class="ranking-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="ranking-list">
      <ul>
        <li v-for="(player, index) in players" :key="player.player_ID">
          <span class="rank">{{ index + 1 }}</span>
          <span class="player-name">{{ player.player_ID }}</span>
          <span class="player-xp">{{ player.xp }} XP</span>
        </li>
      </ul>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      players: [],
      errorMessage: ''
    }
  },
  mounted() {
    // fer solicitud a la API quan el component es monta
    this.fetchPlayers();
  },
  methods: {
    goBack() {
      this.$router.push('/MainMenu');
    },
    async fetchPlayers() {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        // solicitud GET a la API per obtenir els jugadors
        const response = await axios.get('https://balandrau.salle.url.edu/i3/players', {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });

        // Verifico si la conte datos JSON
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
          // emmagatzemar les dades dels jugadors en l'estado del component
          console.log('Players:', response.data);
          this.players = response.data;
        } else {
          console.error('Error: La respuesta no contiene datos JSON');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        this.errorMessage = 'Error fetching players: ' + error.message;
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

.ranking-list {
  margin-top: 20px;
  overflow-y: auto;
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
