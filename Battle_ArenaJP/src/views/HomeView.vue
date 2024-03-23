<template>
  <div class="home-page">
    <div class="banner">
      <h1>BATTLE ARENA</h1>
      <div class="button-container">
        <button class="login-button" @click="goToLogin">LOG IN</button>
        <button class="register-button" @click="goToRegister">Register NOW</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style>
.home-page {
  height: 100vh;
  background: url('path-to-your-background-image.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.banner h1 {
  font-size: 4rem; /* Adjust size as needed */
  color: #ffffff; /* Assuming white text */
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Shadow for text for better readability */
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-button,
.register-button {
  background-color: #ffd700; /* Yellow color for buttons */
  border: none;
  border-radius: 20px; /* Rounded corners for buttons */
  color: #000000; /* Black text on buttons */
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.1s ease;
}

.login-button:hover,
.register-button:hover {
  transform: scale(1.05); /* Slightly enlarge buttons on hover */
}

/* Adjust responsiveness as needed */
@media (max-width: 768px) {
  .banner h1 {
    font-size: 2rem;
  }

  .login-button,
  .register-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
</style>
