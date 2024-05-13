<template>
  <main class="player-info-page">
    <header>
      <button class="back-button" @click="goBack">⬅ Back</button>
      <button class="home-button" @click="goHome">🏠 Home</button>
    </header>
    <section class="player-info">
      <h1>PLAYER INFO</h1>
      <div class="profile-pic-container" @mouseover="showChangePhotoPopup" @mouseleave="hideChangePhotoPopup">
        <img class="profile_pic" :src="img" alt="Player's Photo">
        <div v-if="showPopup" class="change-photo-popup">
          <input type="text" v-model="imageUrl" placeholder="Enter new photo URL">
          <button @click="changePhoto">Change</button>
        </div>
      </div>
      <nav>
      <h2>User ID: {{user}}</h2>
      </nav>
      <figure>
        <!--<img src="@/path-to-player-image.jpg" alt="Player's Photo">-->
        
      </figure>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      player: null,
      user: localStorage.getItem('user'),
      img: localStorage.getItem('img'), 
      showPopup: true,
      imagen: 'https://archive.org/download/cursed-kirby-picture-by-anonymous./IMG-20200912-WA0118.jpg',
      imageUrl: ''
    };
  },
  methods: {
    goBack() {
        
        this.$router.push('/PlayerManagement');
      },
      goHome() {
        this.$router.push('/'); // or any other route you want to navigate to
      },
    showChangePhotoPopup() {
      this.showPopup = true;
    },
    changePhoto() {
      this.imagen = this.imageUrl;
    },
    // Other methods...
  },
  mounted() {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const img = localStorage.getItem('img');
    //const img = localStorage.getItem('img');
    const apiURL = https://balandrau.salle.url.edu/i3/players/+user;
    
    
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
  
</script>

<style>
.player-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/IMATGESFONS/blue.png');
  background-size: cover;
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  font-family: Arial, sans-serif; /* Change to preferred font */
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
  color: #333;
  font-size: 1.2em;
  }
  .home-button {
    padding: 0.5em 1em;
    background-color: #ffd700;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    font-size: 1.2em;
    margin-left: 10px; /* add some margin to separate from the back button */
  }

.player-info {
  padding: 2em;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 80%;
  height: 30em;
  margin: 0 auto;
  text-align: center;
}

.player-info h1 {
  background: yellow; /* White background for text */
  padding: 0.5em 1em;
  margin-bottom: 1em;
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.player-info h2{
  margin-top: 1em;
color: aliceblue;
}
.player-info figure {
  margin: 1em;
  position: relative;
}

.player-info img {
  max-width: 10em; /* Or the size you prefer */
  max-height: auto;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  object-fit: cover;
  /* More styles for the image if needed */
}
.profile-pic-container {
  position: relative;
  display: inline-block;
}
.change-photo-popup {
  position: absolute;
  width: 15em;
  top: 25%;
  left: 0%;
  transform: translateX(80%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.change-photo-popup input {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
}

.change-photo-popup button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.info-list {
  list-style-type: none;
  padding: 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.modify-button {
  padding: 0.5em 1em;
  background-color: #4CAF50; /* Green */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.modify-button:hover {
  background-color: #45a049; /* Darker green on hover */
}
</style>