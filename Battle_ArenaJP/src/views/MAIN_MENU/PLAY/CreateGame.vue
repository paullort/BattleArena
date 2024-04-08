<template>
    <main class="create-game-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
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
  .create-game-page {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url('@/assets/create-game-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: left;
    margin-left: 20rem;
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
    cursor: pointer;
  }
  
  .form {
    margin-top: 2rem;
  }
  
  .label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .input,
  .button {
    padding: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .button {
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .row-column-selector {
    display: flex;
    align-items: left;
    text-align: left;
    justify-content: left;
  }
  
  </style>
  