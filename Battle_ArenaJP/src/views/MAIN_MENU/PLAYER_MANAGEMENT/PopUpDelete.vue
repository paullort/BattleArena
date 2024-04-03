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
        
        this.$router.go(-1);
      },
      confirmDeletion() {
        
      },
      cancelDeletion() {
        
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
    background: #000; 
    text-align: center;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
  }
  
  .back-button {
    background-color: #ffd700; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .deletion-confirmation h2 {
    margin-bottom: 1em;
    background-color: #ffd700;
    padding: 0.5em 1em; 
    color: #000;

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
    background-color: #4CAF50; 
  }
  
  .cancel-button {
    background-color: #f44336; 
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  