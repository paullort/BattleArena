<template>
  <main class="player-info-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="player-info">
      <h1>PLAYER INFO</h1>
      <figure>
        <!--<img src="@/path-to-player-image.jpg" alt="Player's Photo">-->
        <button class="modify-button" @click="modify('photo')">MODIFY</button>
      </figure>
      <dl v-if="player">
        <div class="info-item">
          <dt>Name:</dt>
          <dd>{{ player.name }} <button class="modify-button" @click="modify('name')">MODIFY</button></dd>
        </div>
        <div class="info-item">
          <dt>Experience:</dt>
          <dd>{{ player.experience }} <button class="modify-button" @click="modify('experience')">MODIFY</button></dd>
        </div>
        <div class="info-item">
          <dt>Level:</dt>
          <dd>{{ player.level }} <button class="modify-button" @click="modify('level')">MODIFY</button></dd>
        </div>
        <div class="info-item">
          <dt>Coins:</dt>
          <dd>{{ player.coins }} <button class="modify-button" @click="modify('coins')">MODIFY</button></dd>
        </div>
        <div class="info-item">
          <dt>Equipped attacks:</dt>
          <dd><button class="modify-button" @click="modify('equipped')">MODIFY</button></dd>
        </div>
        <div class="info-item">
          <dt>Backpacked attacks:</dt>
          <dd><button class="modify-button" @click="modify('backpack')">MODIFY</button></dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      player: null,
    };
  },
  mounted() {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const apiURL = `https://balandrau.salle.url.edu/i3/players/`+user;
    console.log('Player ID:', user);
    console.log('ApiURL:', apiURL);
    console.log('Token:', token);
    
    const headers ={
            Bearer: token, // diu dani "Bearer" en contes de "Authorization"
            'Content-Type': 'application/json',
          };
    axios.get(apiURL, {headers}).then((response) => {
      this.player = response.data;

      if(response.status === 200){
        console.log('Player info:', response.data);
        this.player = response.data;
        console.log('Player:', this.player);
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  };
  /*methods: {
    goBack() {
      this.$router.push('/PlayerManagement');
    },
    modify(attribute) {
      console.log(`Modify ${attribute}`);
    },
    async getPlayerInfo() {
      const playerId = this.$route.params.playerId; // suposant que ID del jugador esta en els params de la ruta
      console.log('Player ID:', playerId); 

      const token = localStorage.getItem('token');
      if (!playerId || !token) {
        // error: ID del jugador o token no disponibles
        return;
      }
      try {
        const response = await axios.get(`https://balandrau.salle.url.edu/i3/players/${playerId}`, {
          headers: {
            Bearer: token, // diu dani "Bearer" en contes de "Authorization"
            'Content-Type': 'application/json',
          },
        });
        console.log('Información del jugador:', response.data); // Registrar la informació del jugador
        this.player = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.getPlayerInfo();
  },
};
*/
</script>

<style>
.player-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/player-info-background.jpg'); /* Adjust the path to your image */
  background-size: cover;
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
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
  background-color: #ffd700; /* Yellow background color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.player-info h1 {
  background: yellow; /* White background for text */
  display: inline-block;
  padding: 0.5em 1em;
  margin-bottom: 1em;
  color: black;
}

.player-info figure {
  margin: 1em;
  position: relative;
}

.player-info img {
  max-width: 100px; /* Or the size you prefer */
  max-height: 100px;
  /* More styles for the image if needed */
}
</style>
