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
        days: [], // Inizialmente vuoto, puoi aggiungere giorni più tardi
      },
    }
  },
  methods: {
    addTravel() {
      // Logica per aggiungere una nuova vacanza
      const newTravel = {
        ...this.travel,
        id: Date.now(), // Genera un ID unico basato sul timestamp
      };
      const travels = JSON.parse(localStorage.getItem('travels')) || [];
    
      // Aggiungi il nuovo viaggio all'array esistente
      travels.push(newTravel);
      
      // Salva nuovamente l'array aggiornato nel localStorage
      localStorage.setItem('travels', JSON.stringify(travels));
    
      
      // Reindirizza a Home o mostra un messaggio di successo
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
      <!-- <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea v-model="travel.description" class="form-control" id="description" rows="3" required></textarea>
      </div> -->
      <div class="mb-3">
        <label for="coverImage" class="form-label">URL Immagine di Copertura</label>
        <input type="url" v-model="travel.coverImage" class="form-control" id="coverImage" required />
      </div>
      <!-- <div class="mb-3">
        <label for="startDate" class="form-label">Data di Inizio</label>
        <input type="date" v-model="travel.startDate" class="form-control" id="startDate" required />
      </div>
      <div class="mb-3">
        <label for="endDate" class="form-label">Data di Fine</label>
        <input type="date" v-model="travel.endDate" class="form-control" id="endDate" required />
      </div> -->
      <button type="submit" class="button-19">Aggiungi Vacanza</button>
    </form>
  </div>
</template>



<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
.button-19 {
  text-decoration: none;
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  
}

.button-19:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button-19:main,
.button-19:focus {
  user-select: auto;
}

.button-19:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.button-19:disabled {
  cursor: auto;
}

.button-19:active {
  border-width: 4px 0 0;
  background: none;
}
</style>
