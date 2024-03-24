<template>
    <main class="create-attack-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="attack-form">
        <h1>CREATE NEW ATTACK!</h1>
        <label for="attack-name">Insert name:</label>
        <input type="text" id="attack-name" placeholder="Attack name">
  
        <label for="row-number">Row:</label>
        <output id="row-number" name="row">5</output>
        <span>X</span>
        <label for="column-number">Column:</label>
        <output id="column-number" name="column">5</output>
  
        <p>The power of the cells will be chosen by the API randomly</p>
        <button @click="createAttack">CREATE ATTACK</button>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/Pasarela-play');
      },
      createAttack() {
        // Add the logic for creating an attack here
      }
    }
  }
  </script>
  
  <style>
  .create-attack-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/create-attack-background.jpg'); /* Adjust the path to your image */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
  }
  
  .back-button {
    padding: 0.5em 1em;
    background-color: #ffd700; /* Yellow background color to match the buttons */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .attack-form h1 {
    margin: 0.5em 0;
    color: #ffd700; /* Yellow color to match the theme */
    font-size: 2em;
  }
  
  .attack-form label,
  .attack-form output,
  .attack-form p {
    margin: 0.5em 0;
  }
  
  .attack-form input[type="text"] {
    margin-bottom: 1em;
    padding: 0.5em;
    border: 2px solid #ddd;
  }
  
  .attack-form button {
    padding: 0.5em 1em;
    background-color: #ffd700; /* Yellow background for buttons */
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 1em;
  }
  
  .attack-form button:hover {
    background-color: #ffea00; /* Color on hover */
  }
  
  @media (max-width: 768px) {
    .attack-form button {
      padding: 0.5em;
      font-size: 0.8em;
    }
  }
  </style>
  