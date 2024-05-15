<template>
  <div class="search-bar">
    <input type="text" v-model="searchTerm" @input="updateSearch" placeholder="Buscar jugadores...">
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    updateSearch() {
      this.$emit('search-updated', this.searchTerm);
    }
  }
}
</script>

<style scoped>
.search-bar input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>