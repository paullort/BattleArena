<template>
  <main class="deletion-page">
    <header>
      <button class="back-button" @click="goBack">⬅️ Back</button>
    </header>
    <section class="deletion-content">
      <h1>DELETION</h1>
      <figure>
        <img class="profile_pic" :src="dataPlayer.img" alt="Player's Photo">
        <figcaption>{{ user }}</figcaption>
      </figure>
      <p>You are here to delete this player</p>
      <button class="continue-button" @click="confirmDeletion">CONTINUE</button>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: localStorage.getItem('user'),
      dataPlayer: {
        img: ''
      }
    };
  },
  mounted() {
    this.showPhoto();
  },
  methods: {
    goBack() {
      this.$router.push('/PlayerManagement');
    },
    confirmDeletion() {
      this.$router.push('/PopUpDelete');
    },
    async showPhoto() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://balandrau.salle.url.edu/i3/players/${this.user}`, {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.status === 200) {
          this.dataPlayer = response.data;
        } else {
          console.log(this.user);
        }
      } catch (error) {
        console.error('Error with img:', error);
      }
    }
  }
};
</script>

<style>
.deletion-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/IMATGESFONS/blue.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  font-family: Arial, sans-serif;
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
  width: 100%;
  max-width: 150px;
  border-radius: 50%;
}

.deletion-content p {
  color: #fff;
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
