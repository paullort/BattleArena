<template>
  <main class="create-attack-page">
    <header>
      <nav>
        <button class="back-button" @click="goBack">⬅️ Back</button>
        <button class="home-button" @click="goHome">🏠 Home</button>
      </nav>
    </header>
    <section class="create-attack">
      <h1>Create Attack</h1>
      <p>Set the affected box</p>
      <form @submit.prevent="submitForm">
        <label for="attack-name">Insert name: </label>
        <input type="text" id="attack-name" v-model="attackName" placeholder="Name of the attack" required>
        <section class="row-column-selector">
          <div>
            <h2>Row:</h2>
            <button type="button" @click="changeRows(-1)">-</button>
            <span>{{ rows }}</span>
            <button type="button" @click="changeRows(1)">+</button>
            <h2>Column:</h2>
            <button type="button" @click="changeColumns(-1)">-</button>
            <span>{{ columns }}</span>
            <button type="button" @click="changeColumns(1)">+</button>
          </div>
        </section>
        <div class="submit">
          <button type="submit">CREATE ATTACK</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      attackName: '',
      rows: 9,
      columns: 9,
      health: 8,
      minRows: 2,
      maxRows: 10,
      minColumns: 2,
      maxColumns: 10,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/Store');
    },
    goHome() {
      this.$router.push('/');
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        console.log( `(${this.rows},${this.columns})`)
        const response = await axios.post('https://balandrau.salle.url.edu/i3/shop/attacks',
          {
            attack_ID: this.attackName,
            positions: `(${this.rows},${this.columns})`,
            img: 'https://...', 
          },
          {
            headers: {
              'Bearer': `${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.status === 201) {
          console.log('Attack created:', response.data);
          // Redirect to your attacks or any other route as needed
          this.$router.push('/equippedAttacks');
        } else {
          console.error('Failed to create attack:', response.data);
        }
      } catch (error) {
        console.error('Error creating attack:', error);
      }
    },
    changeRows(amount) {
      if (this.rows + amount >= this.minRows && this.rows + amount <= this.maxRows) {
        this.rows += amount;
      }
    },
    changeColumns(amount) {
      if (this.columns + amount >= this.minColumns && this.columns + amount <= this.maxColumns) {
        this.columns += amount;
      }
    },
  },
};
</script>

<style scoped>
/* Layout */
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
  margin-left: 10px;
}
.create-attack-page {
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
.create-attack {
  padding: 2em;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 80%;
  margin: 0;
  text-align: center;
  color: white;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  z-index: 1;
}

label{
  color:white;
  font-size: 1.5em;
}

/* Typography */
h1 {
  font-size: 3em;
  margin-bottom: 10px;
  color: #ffd700;
  font-weight: bold;
}

p {
  font-size: 1.6em;
  margin-bottom: 20px;
  color: #ffd700;
}
#attack-name{
  font-size: 1.5em;
}

/* Buttons */
button {
  padding: 10px 20px;
  background-color: #ffd700;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  font-size: 1.5em;
}
.submit{
  margin-top: 3em;
}

button:hover {
  background-color: #ffe000;
}

button:disabled {
  background-color: green;
  cursor: not-allowed;
}

/* Row and Column Selector */
.row-column-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.row-column-selector button {
  font-size: 18px;
  padding: 10px 20px;
  margin: 10px;
}

.row-column-selector span {
  font-size: 1.8em;
  color: white;
  margin: 0 10px;
}

/* Media Queries */
@media (max-width: 768px) {
 .create-attack {
    width: 90%;
  }
  button {
    
    font-size: 16px;
  }
}
</style>
