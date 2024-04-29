<template>
  <main class="ranking-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      
    </header>
    <section class="search-section">
      <input type="text" v-model="searchQuery" placeholder="Search players" aria-label="Search players">
      <button @click="sortPlayers">Sort</button>
    </section>
    <section class="ranking-list">
      <ul>
        <li v-for="(player, index) in sortedPlayers" :key="player.id">
          <span class="rank">{{ index + 1 }}</span>
          <span class="player-name">{{ player.name }}</span>
          <span class="player-xp">{{ player.xp }} XP</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      players: [
        { id: 1, name: "JoanMedina", xp: 1000 },
        { id: 2, name: "Pau", xp: 800 },
        { id: 3, name: "JanGarcia", xp: 1200 },
        { id: 4, name: "VegettaGaymer", xp: 900 },
        { id: 5, name: "Willyrex", xp: 1100 },
        // Add more players here
      ],
      searchQuery: ''
    }
  },
  computed: {
    sortedPlayers() {
      return this.players.filter(player => player.name.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => b.xp - a.xp);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/MainMenu');
    },
    sortPlayers() {
      // No need to implement sorting logic here, as it's already done in the computed property
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