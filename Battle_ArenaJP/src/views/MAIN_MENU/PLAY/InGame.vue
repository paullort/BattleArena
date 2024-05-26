<template>
  <div class="arena-page">
    <header>
      <button class="leave-button" @click="leaveGame">Leave Game</button>
    </header>
    <div class="grid-container" :style="{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }">
      <div v-for="i in size * size" :key="i" class="grid-item">{{ i }}</div>
      <div class="circle-red" ref="circle1" :style="{ width: circleSize + 'px', height: circleSize + 'px', transform: `translate(${playerOnePosition.x * circleSize}px, ${playerOnePosition.y * circleSize}px)` }"></div>
      <div class="circle-blue" ref="circle2" :style="{ width: circleSize + 'px', height: circleSize + 'px', transform: `translate(${playerTwoPosition.x * circleSize}px, ${playerTwoPosition.y * circleSize}px)` }"></div>

    </div>
    <div class="imagenes">
      <img class="player-img" :src="infoplayer1.img" alt="Player 1 Image">
      <img class="player-img" :src="infoplayer2.img" alt="Waiting">
    </div>
    <div class="joystick">
      <button class="joystick-button" @click="moveOrChange('up')">⬆</button>
      <div class="horizontal-buttons">
        <button class="joystick-button-left" @click="moveOrChange('left')">⬅</button>
        <button class="joystick-button" @click="moveOrChange('right')">⮕</button>
      </div>
      <button class="joystick-button" @click="moveOrChange('down')">⬇</button>
    </div>
    <div class="attacks">
      <button class="attack1" @click="attack('')">Attack 1</button>
      <button class="attack2" @click="attack('')">Attack 2</button>
      <button class="attack3" @click="attack('')">Attack 3</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: localStorage.getItem('user'),
      player1: '',
      player2: '',
      infoplayer1: [],
      infoplayer2: [],
      rotationPlayer1: 'down',
      size: 4,
      playerOnePosition: { x: 1, y: 0 }, 
      playerTwoPosition: { x: 0, y: 0 },
      inGame: true,
      gameId: '',
      logs: [],
      games: [],
      token: localStorage.getItem('token'),
    };
  },
  computed: {
    circleSize() {
      return 500 / this.size; 
    }
    
  },
  watch: {
    logs: {
      handler() {
        // Aquí puedes llamar a la función que desees cada vez que logs cambie
        this.GetGame();
      },
      deep: false, // Para que también observe cambios en la estructura interna del array
      immediate: false // Para que se ejecute inmediatamente después de la creación del componente
    }
  },  
  
  mounted() {
    this.GetCurrentGame().then(() => {
    this.GetGame();
    this.GetPlayersInfo1();
    this.GetPlayersInfo2();
    });
  },
  methods: {
    async GetCurrentGame() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://balandrau.salle.url.edu/i3/players/arenas/current', {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          this.games = response.data;
          this.size = this.games[0].size;
          this.player1 = this.games[0].players_games[0].player_ID;
          this.player2 = this.games[0].players_games[1].player_ID;
          console.log(this.player1);
          console.log(this.player2);
        }
      } catch (error) {
        console.error('Error entering game:', error);
      }
    },
    async GetPlayersInfo1() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://balandrau.salle.url.edu/i3/players/${this.player1}`, {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          this.infoplayer1 = response.data;
        }
      } catch (error) {
        console.error('Error entering game:', error);
      }
    },
    async GetPlayersInfo2() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://balandrau.salle.url.edu/i3/players/${this.player2}`, {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          this.infoplayer2 = response.data;
        }
      } catch (error) {
        console.error('Error entering game:', error);
      }
    },
    async GetGame() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://balandrau.salle.url.edu/i3/arenas/${this.games[0].game_ID}/logs`, {
          headers: {
            'Bearer': `${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          this.logs = response.data;
          //console.log(this.logs);
          this.updatePlayerDirection();
        }
      } catch (error) {
        console.error('Error entering game:', error);
      }
    },
    async leaveGame() {
      try {
        const response = await axios.delete(`https://balandrau.salle.url.edu/i3/arenas/${this.games[0].game_ID}/play`, {
          headers: {
            'Bearer': `${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 204) {
          this.inGame = false;
          this.$router.push('/MainMenu');
        }
      } catch (error) {
        console.error('Error leaving game:', error);
        this.$router.push('/MainMenu');
      }
    },
    updatePlayerDirection() {
      const lastLog = this.logs[this.logs.length - 1];
      const words = lastLog.description.split(' ');

      let player = null;
      let currentPlayer = words[0].replace(/^'|'$/g, '');
      console.log(currentPlayer);

      if (currentPlayer === this.player1) {
        player = this.$refs.circle1;
      } else {
        player = this.$refs.circle2;
      }

      switch (words[1]) {
        case 'changes':
          switch (words[4]) {
            case 'up':
              player.style.transform = 'rotate(180deg)';
              break;
            case 'down':
              player.style.transform = 'rotate(0deg)';
              break;
            case 'left':
              player.style.transform = 'rotate(90deg)';
              break;
            case 'right':
              player.style.transform = 'rotate(-90deg)';
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
    async move() {
      try {
        const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/move`, {
          headers: {
            'Bearer': `${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          //
        }
      } catch (error) {
        console.error('Error moving:', error);
      }
    },
    async changeDirection(direction) {
      try {
        const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/direction`, { direction }, {
          headers: {
            'Bearer': `${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {

          this.rotationPlayer1 = direction;
          this.updatePlayerDirection();
        }
      } catch (error) {
        console.error(`Error changing direction to ${direction}:`, error);
      }
    },
    async moveOrChange(direction){

      if(direction == this.rotationPlayer1){
        this.move();
        console.log('MOU');
      }else{
        this.changeDirection(direction);
        console.log('CAMBIA');
      }
    },
    async attack() {
      try {
        const response = await axios.post(`https://balandrau.salle.url.edu/i3/arenas/attack/${this.games[0].game_ID}`, null, {
          headers: {
            'Bearer': `${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          //
        }
      } catch (error) {
        console.error('Error attacking:', error);
      }
    },
    goBack() {
      this.$router.push('/Store');
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.arena-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #333;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
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

.leave-button {
  padding: 0.5em 1em;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  font-size: 1.2em;
  position: absolute;
  top: 1em;
  right: 1em;
}

.grid-container {
  display: grid;
  width: 80vw;
  height: 80vw;
  max-width: 40em;
  max-height: 40em;
  flex: 1;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.grid-item {
  background-color: #eee;
  padding: 0px;
  border: 0.1rem solid #c3c3c3;
  margin: 0;
  aspect-ratio: 1/1;
}

.circle-red, .circle-blue {
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-red {
  background-image: url('@/assets/IMATGESFONS/reed.jpg');
  background-size: cover;
  top: 50%;
  left: 50%;
}

.circle-blue {
  background-image: url('@/assets/IMATGESFONS/bluee.jpg');
  background-size: cover;
  top: 20%;
  left: 50%;
}

.imagenes {
  position: absolute;
  display: flex;
  top: 3em;
  left: 1em;
}

.player-img {
  width: 10vw;
  margin: 2em;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  alt: ;
}

.joystick {
  position: absolute;
  top: 10vh;
  right: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.horizontal-buttons {
  display: flex;
  gap: 7em;
}

.joystick-button, .joystick-button-left {
  width: 3em;
  height: 3em;
  background-color: #ffd700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  font-size: 2em;
}

.attacks {
  position: absolute;
  top: 55vh;
  right: 7vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.attacks button {
  width: 9em;
  height: 3em;
  background-color: #ffd700;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  font-size: 2em;
}
</style>
