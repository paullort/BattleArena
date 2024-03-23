<template>
  <main class="register-page">
    <nav>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </nav>
    <section class="form-container">
      <h1 class="form-title">REGISTER FORM</h1>
      <form @submit.prevent="submitForm">
        <input type="text" placeholder="First Name" required>
        <input type="text" placeholder="Last Name">
        <input type="text" placeholder="Username" required>
        <input type="password" placeholder="Password" required>
        <input type="password" placeholder="Repeat password" required>
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
    submitForm() {
      // Aquí iría la lógica para procesar el formulario de registro.
    }
  }
}
</script>

<style>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('~@/assets/register-background.jpg'); /* Asegúrate de que la ruta a la imagen es correcta */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

nav {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
}

.back-button {
  padding: 0.5em 1em;
  background: none;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

.form-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  border-radius: 10px;
  text-align: center;
}

.form-title {
  color: #000;
  margin-bottom: 1em;
}

.form-label {
  display: block;
  margin-bottom: 0.5em;
  color: #4d6d91;
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
</style>
