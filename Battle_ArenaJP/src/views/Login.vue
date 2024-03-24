<template>
  <main class="login-page">
    <nav>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </nav>
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
      // Aquí iría la lógica de inicio de sesión.
    }
  }
}
</script>

<style scoped>
/* Estilos generales, puedes reutilizar los del formulario de registro */
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
  background-image: url('@/assets/IMATGESFONS/pree.png'); /* Asegúrate de que la ruta a la imagen es correcta */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Estilos para el botón de regresar */
/* Reutiliza los estilos de .back-button que ya has definido en tu formulario de registro */

/* Contenedor del formulario y título */
.form-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  border-radius: 10px;
  text-align: center;
}

.form-title {
  background-color: #ffd700; /* Color de fondo del título */
  color: black; /* Color del texto del título */
  padding: 10px;
  margin-bottom: 20px;
}

/* Estilos de las etiquetas y campos de texto */
.form-label {
  display: block;
  margin-bottom: 1em;
  color: #333; /* Cambia este color según tus preferencias */
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Estilos para el botón de continuar */
.continue-button {
  width: 100%;
  padding: 0.5em;
  background-color: #ffd700; /* Fondo amarillo */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-button:hover {
  opacity: 0.9;
}
</style>
