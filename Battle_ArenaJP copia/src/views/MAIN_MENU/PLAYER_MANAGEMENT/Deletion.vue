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
        
        this.$router.push('/PlayerManagement');
      },
      confirmDeletion() {
        
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
    background-color: black;

    text-align: center;
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
  
  .deletion-content h1 {
    margin-bottom: 1em;
    background-color: #ffd700; 
    padding: 0.5em 1em;
    color: #000;
    
  }
  
  .deletion-content figure {
    margin: 1em;
    
  }
  
  .deletion-content img {
    
  }
  
  .deletion-content p {
    color: #000; 
    margin-bottom: 1em;
  }
  
  .continue-button {
    background-color: #ccc; 
    border: none;
    border-radius: 5px;
    padding: 0.5em 1em;
    cursor: pointer;
    font-size: 1em;
    
  }
  
  
</style>
  