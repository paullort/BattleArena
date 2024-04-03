<template>
  <main class="login-page">
    <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
    <section class="form-container">
      <h1 class="form-title">LOGIN</h1>
      <form @submit.prevent="submitLogin">
        <input type="text" placeholder="Username" required>
        <input type="password" placeholder="Password" required>
        <button type="submit" class="continue-button">continue</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitLogin() {
      //lógica de inicio de sesión.
    }
  }
}
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
