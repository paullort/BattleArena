<template>
  <main class="register-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="form-container">
      <h1 class="form-title">REGISTER FORM</h1>
      <form @submit.prevent="submitForm">
        <input v-model="playerID" type="text" placeholder="Player ID" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <input v-model="img" type="text" placeholder="Profile Image URL" required>
        <button type="submit" class="continue-button">continue</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      playerID: '',
      password: '',
      img: '',
      errorMessage: '',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async submitForm() {
      try {
        const response = await axios.post('https://balandrau.salle.url.edu/i3/players', {
          player_ID: this.playerID,
          password: this.password,
          img: this.img,
        });
        if (response.status === 201) {
          this.$router.push('/login');
          
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.error.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/IMATGESFONS/pree.png');
  background-size: cover;
  background-position: center center;
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
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.form-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  border-radius: 10px;
  text-align: center;
}

.form-title {
  background-color: #ffd700;
  color: black;
  padding: 10px;
  margin-bottom: 20px;
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.continue-button {
  padding: 0.5em 1em;
  background-color: #edd54d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
}

.continue-button:hover {
  background-color: #ffea00;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
