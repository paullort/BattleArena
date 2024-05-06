<template>
  <main class="store-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="store-container">
      <h1>SHOP</h1>
      <nav class="menu-items">
      <button @click="createAttack">CREATE ATTACK</button>
      <button @click="equippedAttacks">EQUIPPED ATTACKS</button>
      <button @click="buyAttack">BUY ATTACK</button>
      <button @click="sellAttack">SELL ATTACK</button>
    </nav>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    goBack() {
      // Navega de vuelta a la pantalla anterior
      this.$router.push("/MainMenu");
    },
    createAttack() {
      // Lógica para crear ataque
      this.$router.push("/createAttack");
    },
    equippedAttacks() {
      // Lógica para mostrar ataques equipados
      this.$router.push("/equippedAttacks");
    },
    buyAttack() {
      // Lógica para comprar ataque
      this.$router.push("/buyAttack");
    },
    sellAttack() {
      // Lógica para vender ataque
      this.$router.push("/sellAttack");
    },
  },
};
</script>

<style scoped>
.store-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/IMATGESFONS/blue.png'); 
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  z-index: 1;
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

.home-button {
  padding: 0.5em 1em;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  font-size: 1.2em;
  margin-left: 10px;
}

.store-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.store-container h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 3em;
}

.menu-items {
    display: flex;
    flex-direction: column; 
    width: 20%;
  }

.store-container button {
  background-color: #ffd700;
  color: black;
  margin: 10px;
  padding: 20px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.store-container button:hover {
  background-color: #ffea00;
}

@media (max-width: 768px) {
  .store-container button {
    padding: 0.5em 1em;
    font-size: 1em;
  }
}
</style>