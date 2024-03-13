<template>
  <div class="home-page">
    <div class="banner">
      <h1>BATTLE ARENA</h1>
      <button @click="goToLogin">LOG IN</button>
      <button @click="goToRegister">Register NOW</button>
    </div>
    <!-- Coloca aquí más contenido de la página de inicio si es necesario -->
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
.home-page .banner {
  /* Agrega estilos para el banner aquí */
}
</style>
