<template>
  <main class="login-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="form-container">
      <h1 class="form-title">LOGIN</h1>
      <form @submit.prevent="submitLogin">
        <input v-model="playerID" type="text" placeholder="Player ID" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit" class="continue-button">continue</button>
      </form>
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async submitLogin() {
      console.log('Player ID:', this.playerID);
      console.log('Password:', this.password);
      try {
        const response = await axios.post('https://balandrau.salle.url.edu/i3/players/join', {
          player_ID: this.playerID,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        if (response && response.status === 400) {
          console.error('Error instance:', response.data.error);
        } else {
          // Handle other errors
          console.error('Error:', error);
        }
        // Redirect or show success message
        this.$router.push('/somewhere');
      } catch (error) {
        
      }
    },
  },
};
</script>


<style scoped>

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/IMATGESFONS/pree.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  align-items: center;
  justify-content: center;
}

header {
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

.form-label {
  display: block;
  margin-bottom: 1em;
  color: #333; 
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
  width: 100%;
  padding: 0.5em;
  background-color: #ffd700; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-button:hover {
  opacity: 0.9;
}
</style>
