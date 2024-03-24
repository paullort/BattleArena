<template>
    <main class="deletion-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
      </header>
      <section class="deletion-content">
        <h1>DELETION</h1>
        <figure>
          <!--<img src="@/assets/player-photo.jpg" alt="Player's Photo">-->
          <figcaption>FOTO del player en qüestió</figcaption>
        </figure>
        <p>You are here to delete this player</p>
        <button class="continue-button" @click="confirmDeletion">CONTINUE</button>
      </section>
    </main>
</template>
  
<script>
  export default {
    methods: {
      goBack() {
        // Navega de vuelta a la gestión del jugador
        this.$router.push('/PlayerManagement');
      },
      confirmDeletion() {
        // Lógica para confirmar la eliminación del jugador
        this.$router.push('/PopUpDelete');
      }
    }
  }
</script>
  
<style>
  .deletion-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #fff; /* o cualquier otro color o imagen de fondo */
    text-align: center;
  }
  
  header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
  }
  
  .back-button {
    background-color: #ffd700; /* un color que contraste con el fondo */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .deletion-content h1 {
    margin-bottom: 1em;
    background-color: #ffd700; /* mismo color de fondo que el botón */
    padding: 0.5em 1em;
    /* Añadir sombra de texto o bordes si es necesario */
  }
  
  .deletion-content figure {
    margin: 1em;
    /* Agregar estilos para la figura y la imagen aquí */
  }
  
  .deletion-content img {
    /* Definir el tamaño y otros estilos para la imagen del jugador */
  }
  
  .deletion-content p {
    color: #000; /* Color de texto */
    margin-bottom: 1em;
  }
  
  .continue-button {
    background-color: #ccc; /* un color neutro para el botón */
    border: none;
    border-radius: 5px;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: 1em;
    /* Añadir efecto hover o activo si se desea */
  }
  
  /* Media queries y otros estilos */
</style>
  