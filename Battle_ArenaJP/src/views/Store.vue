<template>
    <main class="store-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="store-container">
        <h1>SHOP</h1>
        <button @click="createAttack">CREATE ATTACK</button>
        <button @click="equippedAttacks">EQUIPPED ATTACKS</button>
        <button @click="buyAttack">BUY ATTACK</button>
        <button @click="sellAttack">SELL ATTACK</button>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        // Navega de vuelta a la pantalla anterior
        this.$router.push('/MainMenu');
      },
      createAttack() {
        // Lógica para crear ataque
      },
      equippedAttacks() {
        // Lógica para mostrar ataques equipados
      },
      buyAttack() {
        // Lógica para comprar ataque
      },
      sellAttack() {
        // Lógica para vender ataque
      }
    }
  }
  </script>
  
  <style>
  .store-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/store-background.jpg'); /* Asegúrate de que la ruta a la imagen es correcta */
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
    background-color: #ffd700; /* Color de fondo amarillo para que coincida con la imagen */
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .store-container h1 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
  
  .store-container button {
    background-color: #ffd700; /* Color de fondo amarillo para los botones */
    color: black;
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    display: block; /* Hace que los botones se apilen verticalmente */
  }
  
  .store-container button:hover {
    background-color: #ffea00; /* Color de fondo al hacer hover */
  }
  
  @media (max-width: 768px) {
    .store-container button {
      padding: 0.5em 1em;
      font-size: 1em;
    }
  }
  </style>
  