<template>
  <main class="home-page">
    <article class="banner">
      <h1>BATTLE ARENA</h1>
      <div class="button-container">
        <button class="login-button" @click="goToLogin">LOG IN</button>
        <button class="register-button" @click="goToRegister">Register NOW</button>
        <!-- Botón TEMPORAL para desarrollo -->
        <button class="temporal-button" @click="goToMainMenu">TEMPORAL-on et portaria si estiguessis logejat</button>
      </div>
    </article>
  </main>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToMainMenu() {
      
      this.$router.push('/MainMenu');
    }
  }
}
</script>

<style scoped>

.home-page {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/IMATGESFONS/main.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0px;
  
}
.banner{
  border: 0px;
  padding: 0px;
  margin: 0px;
}

.banner h1 {
  font-size: 5rem; 
  font-weight: bold;
  color: #ffffff; 
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); 
  
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-button,
.register-button {
  background-color: #ffd700; 
  border: none;
  border-radius: 20px; 
  color: #000000; 
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.1s ease;
}

.login-button:hover,
.register-button:hover {
  transform: scale(1.05); 
}

.temporal-button {
  background-color: #4CAF50; 
  border-radius: 20px;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.temporal-button:hover {
  background-color: #66BB6A; 
}

@media (max-width: 768px) {
  .banner h1 {
    font-size: 2rem;
  }

  .login-button,
  .register-button,
  .temporal-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
</style>
