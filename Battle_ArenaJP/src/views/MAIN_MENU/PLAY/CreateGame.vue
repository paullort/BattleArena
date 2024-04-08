<template>
  <main class="create-game-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <div class="container">
      <div class="content">
        <h1>Create New Game!</h1>
        <form @submit.prevent="submitForm">
          <label for="game-name">Insert name:</label>
          <input type="text" id="game-name" v-model="gameName" placeholder="Name of the game" required>

          <section class="row-column-selector">
            <label for="rows">Rows:</label>
            <button type="button" @click="changeRows(-1)">-</button>
            <span>{{ rows }}</span>
            <button type="button" @click="changeRows(1)">+</button>
            <span>X</span>
            <label for="columns">Columns:</label>
            <button type="button" @click="changeColumns(-1)">-</button>
            <span>{{ columns }}</span>
            <button type="button" @click="changeColumns(1)">+</button>
            <span>min 2, max 10</span>
          </section>

          <label for="health">Health:</label>
          <span id="health">{{ health }}</span>
          <button type="submit">CREATE GAME</button>
        </form>
      </div>

      <!-- Dynamic grid -->
      <div class="grid-container">
        <div v-for="row in rows" :key="row" class="grid-row">
          <div v-for="col in columns" :key="col" class="grid-cell"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      gameName: '',
      rows: 5,
      columns: 5,
      health: 8,
      min: 2,
      max: 10,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/Pasarela-play');
    },
    submitForm() {
      console.log('Creating game with:', this.gameName, this.rows, this.columns, this.health);
    },
    changeRows(amount) {
      if (this.rows + amount >= this.min && this.rows + amount <= this.max) {
        this.rows += amount;
      }
    },
    changeColumns(amount) {
      if (this.columns + amount >= this.min && this.columns + amount <= this.max) {
        this.columns += amount;
      }
    }
  }
}
</script>

<style scoped>
.back-button {
    padding: 0.5em 1em;
    background-color: #ffd700; 
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin: 0px;
  }

.create-game-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

header {
  align-self: flex-start; /* Alinear arriba a la izquierda */
  margin-bottom: 20px; /* Espacio entre el header y el contenido */
}

.container {
  display: flex;
  flex-direction: row; /* Alinear elementos en fila */
  align-items: flex-start; /* Alinear arriba a la izquierda */
}

.content {
  margin-right: 500px; /* Espacio entre el contenido y el grid */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  gap: 0px; /* Ajusta según necesites */
  
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 50px; /* Ajusta según necesites */
  height: 50px; /* Ajusta según necesites */
  background-color: #ccc; /* Ajusta según necesites */
  border: 1px solid #999; /* Ajusta según necesites */
}
</style>
