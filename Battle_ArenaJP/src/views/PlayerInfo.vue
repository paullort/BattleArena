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
        <dl>
          <div class="info-item">
            <dt>Name:</dt>
            <dd>(of the player) <button class="modify-button" @click="modify('name')">MODIFY</button></dd>
          </div>
          <div class="info-item">
            <dt>Experience:</dt>
            <dd>(of the player) <button class="modify-button" @click="modify('experience')">MODIFY</button></dd>
          </div>
          <div class="info-item">
            <dt>Level:</dt>
            <dd>(of the player) <button class="modify-button" @click="modify('level')">MODIFY</button></dd>
          </div>
          <div class="info-item">
            <dt>Coins:</dt>
            <dd>(of the player) <button class="modify-button" @click="modify('coins')">MODIFY</button></dd>
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
  export default {
    methods: {
      goBack() {
        // Replace with your route
        this.$router.push('/previous-page');
      },
      modify(attribute) {
        // Replace with your logic
        console.log(`Modify ${attribute}`);
      }
    }
  }
</script>

<style>
.player-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('@/assets/player-info-background.jpg'); /* Adjust the path to your image */
  background-size: cover;
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
  background: white; /* White background for text */
  display: inline-block;
  padding: 0.5em 1em;
  margin-bottom: 1em;
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