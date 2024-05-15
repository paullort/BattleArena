<template>
    <main class="buy-attack-page">
      <header>
        <button class="back-button" @click="goBack">⬅️ Back</button>
        <button class="home-button" @click="goHome">🏠 Home</button>
      </header>
      <section class="attack-list">
        <h1>Available Attacks</h1>
        <p>Here are available attacks to buy</p>
        <ul class="attack-grid">
          <li v-for="(attack, index) in attacks" :key="index" 
              :class="['attack-item', `power-${attack.power}`]">
            <div class="attack-name">{{ attack.attack_ID }}</div>
            <div class="positions">Positions: {{ attack.positions }}</div>
            <div class="attack-details">
  <div class="attack-power">Power: {{ attack.power }}</div>
  <div class="attack-price">Price: {{ attack.price }}</div>
</div>

            
          </li>
        </ul>
      </section>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        attacks: [],
        imgs: [],
        joiningGame: false,
      };
    },
    mounted() {
      this.fetchAttacks();
      this.fetchImg();
    },
    methods: {
      async fetchAttacks() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://balandrau.salle.url.edu/i3/shop/attacks', {
            headers: {
              'Bearer': `${token}`,
              'Accept': 'application/json'
            }
          });
          if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
            console.log('Players:', response.data);
            this.attacks = response.data;
          } else {
            console.error('Error: La respuesta no contiene datos JSON');
          }
        } catch (error) {
          console.error('Error fetching attacks:', error);
        }
      },
      async fetchImg() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://balandrau.salle.url.edu/i3/players/', {
            headers: {
              'Bearer': `${token}`,
              'Accept': 'application/json'
            }
          });
          if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
            console.log('Players:', response.data);
            this.games = response.data;
          } else {
            console.error('Error: La respuesta no contiene datos JSON');
          }
        } catch (error) {
          console.error('Error fetching games:', error);
        }
      },
      goBack() {
        this.$router.push('/Store');
      },
      goHome() {
        this.$router.push('/');
      },
      joinGame(gameId) {
        this.joiningGame = true;
        console.log('Joining game:', gameId);
        setTimeout(() => {
          this.joiningGame = false;
        }, 2000);
      },
    },
  };
  </script>
  
  <style scoped>
  .buy-attack-page {
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
    color: #fff;
    width: 100%;
    text-align: left;
  }
  
  .back-button,
  .home-button {
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
    margin-left: 10px;
  }
  
  .attack-list {
    padding: 2em;
    background-color: #333;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: 90%;
    height: 80%;
    margin: 4 auto;
    text-align: center;
    overflow-y: auto;
  }
  
  /* Ocultar la barra de desplazamiento */
  .attack-list::-webkit-scrollbar {
    display: none;
  }
  
  .attack-list {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .attack-list h1 {
    color: #ffd700;
    margin-bottom: 0.5em;
    font-size: 3em;
    font-weight: bold;
  }
  
  .attack-list p {
    color: #ffd700;
    font-size: 1.5em;
    margin-bottom: 2em;
  }
  
  .attack-list ul {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 1em;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .attack-item {
    width: 16.5em;
    height: 10em;
    border: 2px solid #333;
    border-radius: 10px;
    padding: 1em;
    color: #333;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
    box-sizing: border-box; /* Ensure padding and border are included in width and height */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  .attack-item:hover {
  background-color: #4CAF50; /* Cambia el color de fondo */
  color: white; /* Cambia el color del texto */
  cursor: pointer; /* Cambia el cursor a un puntero */
  content: "Buy";
}
.attack-details {
  display: flex;
  justify-content: space-between;
}

.attack-details .attack-power,
.attack-details .attack-price {
  margin-right: 1em; /* Ajusta el espacio entre Power y Price según sea necesario */
}


  
  .attack-name {
    margin-bottom: 0.5em;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .attack-item .attack-power,
  .attack-item .attack-price {
    margin-top: 2em;
  }
  
  /* Colores según el poder del ataque */
  .power-1 {
    background-color: #ffd700; /* Amarillo */
  }
  
  .power-2 {
    background-color: #ffa500; /* Naranja */
  }
  
  .power-3 {
    background-color: #ff4500; /* Rojo oscuro */
  }
  
  .power-4 {
    background-color: #ff0000; /* Rojo */
  }
  
  @media (max-width: 768px) {
    .attack-list {
      width: 90%;
    }
    .back-button,
    .home-button {
      padding: 0.5em;
      font-size: 1.2em;
    }
    .attack-list ul {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    .attack-item {
      width: 150px;
      height: 150px;
    }
  }
  </style>
  