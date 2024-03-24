<template>
    <main class="popup-deletion-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="deletion-confirmation">
        <h2>Are you sure you want to delete this player?</h2>
        <button class="confirm-button" @click="confirmDeletion">YES</button>
        <button class="cancel-button" @click="cancelDeletion">NO</button>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navigate back to the previous page
        this.$router.go(-1);
      },
      confirmDeletion() {
        // Logic to confirm deletion
      },
      cancelDeletion() {
        // Logic to cancel deletion
      },
    }
  }
  </script>
  
  <style>
  .popup-deletion-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #fff; /* o el color de fondo deseado */
    text-align: center;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
  }
  
  .back-button {
    background-color: #ffd700; /* un color que contraste con el fondo */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .deletion-confirmation h2 {
    margin-bottom: 1em;
    background-color: #ffd700; /* un color para resaltar la pregunta */
    padding: 0.5em 1em;
    /* Agregar sombra de texto o bordes si es necesario */
  }
  
  button {
    padding: 0.5em 1em;
    margin: 0.5em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
  }
  
  .confirm-button {
    background-color: #4CAF50; /* Color para la confirmación */
  }
  
  .cancel-button {
    background-color: #f44336; /* Color para cancelar */
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  