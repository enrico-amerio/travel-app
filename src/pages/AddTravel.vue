<script>
export default {
  data() {
    return {
      travel: {
        title: '',
        description: '',
        coverImage: '',
        startDate: '',
        endDate: '',
        days: [],
      },
    }
  },
  methods: {
    addTravel() {
      const newTravel = {
        ...this.travel,
        id: Date.now(), 
      };
      const travels = JSON.parse(localStorage.getItem('travels')) || [];
    
      travels.push(newTravel);
      
      localStorage.setItem('travels', JSON.stringify(travels));
    
      
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
<template>
  <div class="container">
    <router-link to="/" class="back-arrow">
      <i class="fas fa-arrow-left"></i> Torna alla Home
    </router-link>
    <h1 class="py-4">Aggiungi una Nuova Vacanza</h1>
    <form @submit.prevent="addTravel">
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <input type="text" v-model="travel.title" class="form-control" id="title" required />
      </div>
      <div class="mb-3">
        <label for="coverImage" class="form-label">URL Immagine di Copertina</label>
        <input type="url" v-model="travel.coverImage" class="form-control" id="coverImage" required />
      </div>
      <button type="submit" class="custom-btn">Aggiungi Vacanza</button>
    </form>
  </div>
</template>



<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

</style>
