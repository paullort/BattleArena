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
            <div>
              <label for="rows">Rows:</label>
              <button type="button" @click="changeRows(-1)">-</button>
              <span>{{ rows }}</span>
              <button type="button" @click="changeRows(1)">+</button>
            </div>
            <span>X</span>
            <div>
              <label for="columns">Columns:</label>
              <button type="button" @click="changeColumns(-1)">-</button>
              <span>{{ columns }}</span>
              <button type="button" @click="changeColumns(1)">+</button>
            </div>
            </section>

          <label for="health">Health:</label>
          <input type="number" id="health" v-model.number="health" min="1" max="20" required>
        </form>
        <div class="submit">
        <button type="submit">CREATE GAME</button>
        </div>
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
      rows: 10,
      columns: 10,
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
  }
  

.create-game-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

header {
  align-self: flex-start; /* Alinear arriba a la izquierda */
}

.container {
  display: flex;
  flex-direction: row; /* Alinear elementos en fila */
  align-items: flex-start; /* Alinear arriba a la izquierda */
}

.content {
  width: 450px; /* Fixed width for the content */
  height: calc(100vh - 100px); /* Fixed height for the content */
  overflow-y: auto; /* Add vertical scrollbar if content overflows */
  margin-left: 15vw;
  margin-right: 5vw;
  text-align: center;
  font-size: 2rem;
}

#game-name {
  font-size: 0.8em; /* Ajusta el tamaño del texto del input */
  padding: 0.3em; /* Añade espacio alrededor del texto dentro del input */
  margin-bottom: 1rem;
}

#health{
  font-size: 0.8em; /* Ajusta el tamaño del texto del input */
  padding: 0.1em; /* Añade espacio alrededor del texto dentro del input */
  margin-bottom: 1rem;
  width: 4rem;
}
.row-column-selector > div {
  display: flex;
  align-items: center; /* Alinear verticalmente los elementos */
  justify-content: center; /* Centrar horizontalmente los elementos */
}
.row-column-selector button {
  font-size: 1rem; /* Ajusta el tamaño del texto de los botones + y - */
  padding: 0.4rem 0.5em; /* Añade espacio alrededor del texto dentro del botón */
  margin: 0.5rem;
  text-align: center;
}

h1 {
  margin-top: 10vh;
  font-size: 3.3rem;
}

.grid-container {
  flex: 1; /* Let the grid occupy the remaining space */
  width: 100%; /* Ensure the grid container takes full width */
  overflow: hidden; /* Hide any content that overflows */
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 50px); /* Fixed height for each row */
  gap: 0px; /* Adjust as needed */
  border: 0.4rem solid green; /* Adjust as needed */
  margin-top: 5rem;
}
.grid-row {
  display: flex;
}

.grid-cell {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  margin: 0; /* Remove margin */
  background-color: #ccc; /* Adjust as needed */
  border: 1px solid #999; /* Adjust as needed */
}

.submit{
  font-size: 0.8em; /* Ajusta el tamaño del texto del input */
  padding: 0.3em; /* Añade espacio alrededor del texto dentro del input */
  margin-bottom: 1rem;
}


</style>
