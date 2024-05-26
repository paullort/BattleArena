<template>
  <main class="create-game-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <div class="container">
      <div class="content">
        <h1>Create New Game!</h1>
        <form @submit.prevent="submitForm">
          <label for="game-name">Insert name:</label>
          <input type="text" id="game-name" v-model="gameName" placeholder="Name of the game" required>

          <section class="row-column-selector">
            <div>
              <label for="size">Grid Size:</label>
              <button type="button" @click="changeSize(-1)">-</button>
              <span>{{ size }}</span>
              <button type="button" @click="changeSize(1)">+</button>
            </div>
          </section>

          <label for="health">Max Health:</label>
          <input type="number" id="health" v-model.number="health" min="15" max="30" required>
          <div class="submit">
            <button type="submit">CREATE GAME</button>
          </div>
        </form>
      </div>

      <!-- Dynamic grid -->
      <div class="grid-container">
        <div v-for="row in size" :key="row" class="grid-row">
          <div v-for="col in size" :key="col" class="grid-cell"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gameName: '',
      size: 10,
      health: 8,
      min: 2,
      max: 10,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/Pasarela-play');
    },
    goHome() {
      this.$router.push('/'); // or any other route you want to navigate to
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        console.log( this.size);
        const response = await axios.post('https://balandrau.salle.url.edu/i3/arenas',
          {
            game_ID: this.gameName,
            size: this.size,
            HP_max: this.health, 
          },
          {
            headers: {
              'Bearer': `${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.status === 201) {
          console.log('Game created:', response.data);
          // Redirect to your attacks or any other route as needed
          this.$router.push('/InGame');
        } else {
          console.error('Failed to create attack:', response.data);
        }
      } catch (error) {
        console.error('Error creating attack:', error);
      }
    },
    changeSize(amount) {
      if (this.size + amount >= this.min && this.size + amount <= this.max) {
        this.size += amount;
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
}

.back-button, .home-button {
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

.create-game-page {
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.content {
  width: 450px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin-left: 15vw;
  margin-right: 5vw;
  text-align: center;
  font-size: 2rem;
  color: white;
}

#game-name, #health {
  font-size: 0.7em;
  padding: 0.3em;
  margin-bottom: 1rem;
  color: rgb(0, 0, 0);
}

.row-column-selector > div {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.row-column-selector button {
  font-size: 1rem;
  padding: 0.4rem 0.5em;
  margin: 0.5rem;
  text-align: center;
}

h1 {
  margin-top: 10vh;
  font-size: 3.3rem;
  color: white;
}

.grid-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(var(--size), 1fr);
  grid-template-rows: repeat(var(--size), 50px);
  gap: 0px;
  border: 0.4rem solid green;
  margin-top: 5rem;
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 50px;
  height: 50px;
  margin: 0;
  background-color: #ccc;
  border: 1px solid #999;
}

.submit button {
  font-size: 0.8em;
  padding: 0.3em;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #433;
  font-weight: bold;
  font-size: 1em;
}
</style>
