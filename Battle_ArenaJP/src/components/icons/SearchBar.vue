<template>
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/MainMenu');
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
  </style>