<template>
    <section class="ranking-list">
      <ul>
        <li v-for="(player, index) in players" :key="player.player_ID">
          <span class="rank">{{ index + 1 }}</span>
          <span class="player-name">{{ player.player_ID }}</span>
          <span class="player-xp">{{ player.xp }} XP</span>
        </li>
      </ul>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      players: Array,
      errorMessage: String
    }
  }
  </script>
  
  <style scoped>
  .ranking-list {
    margin-top: 20px;
    overflow-y: auto;
  }
  
  .ranking-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .ranking-list li {
    background-color: #fff;
    margin: 0.5em 0;
    padding: 0.5em;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .ranking-list li span {
    display: inline-block;
    margin-right: 10px;
  }
  
  .rank {
    font-weight: bold;
    color: #666;
  }
  
  .player-name {
    font-size: 18px;
    color: #333;
  }
  
  .player-xp {
    font-size: 16px;
    color: #999;
  }
  </style>