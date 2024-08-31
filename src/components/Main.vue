<script>
export default {
  data() {
    return {
      travels: [],
    }
  },
  mounted() {
    this.loadTravels();
  },
  methods: {
    loadTravels() {
      const storedTravels = JSON.parse(localStorage.getItem('travels')) || [];
      this.travels = storedTravels;
    },
    deleteTravel(travelId) {
      const confirmDelete = confirm('Sei sicuro di voler cancellare questa vacanza?');
      if (confirmDelete) {
        this.travels = this.travels.filter(travel => travel.id !== travelId);
        this.saveTravels();
        alert('Vacanza cancellata con successo!');
      }
    },
    saveTravels() {
      localStorage.setItem('travels', JSON.stringify(this.travels));
      this.loadTravels(); 
    }
  }
}
</script>

<template>
  <div class="container text-center">
    <h1 class="py-4">Diario di Viaggio</h1>
    <router-link :to="{ name: 'addTravel' }" class="button-19">Nuova Vacanza</router-link>
  </div>
  <div class="wrapper">
    <div class="item" v-for="travel in travels" :key="travel.id">
      <div class="polaroid-container">
        <button class="delete-btn" @click.stop="deleteTravel(travel.id)">×</button>
        <router-link :to="{ name: 'TravelDetail', params: { id: travel.id }}" class="link">
          <div class="polaroid">
            <img :src="travel.coverImage">
            <div class="caption">{{ travel.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: black;
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
  font-family: din-round, sans-serif;
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
.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
.polaroid-container {
  position: relative;
  display: inline-block; /* Importante per mantenere la dimensione del contenitore */
}
.polaroid {
  position: relative;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0,0,0,0.2);
}

.polaroid > img {
  width: 100%;
  max-height: 300px; 
  object-fit: cover; 
  display: block; 
}

.delete-btn {
  position: absolute;
  top: 10px; 
  right: 10px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 1;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0;
}

.delete-btn:hover {
  background: #bc2525;
}
.caption {
  font-size: 1.8rem;
  text-align: center;
  line-height: 2em;
}
.item {
  width: 30%;
  display: inline-block;
  margin-top: 2rem;
  filter: grayscale(100%);
  position: relative; 
}
.item .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) {
  transform: scale(0.8, 0.8) rotate(5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+2) {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+2) .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+4) {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+4) .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:nth-of-type(4n+3) {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+3) .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:hover {
  filter: none;
  transform: scale(1, 1) rotate(0deg) !important;
  transition: all 0.35s;
}
.item:hover .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.2);
  transition: all 0.35s;
}

@media (max-width: 768px) {
  .item {
    width: 100%; /* Ogni polaroid occuperà tutta la larghezza disponibile */
    display: block;
    margin-top: 1rem;
    transform: none; /* Rimuove la rotazione */
    filter: none; /* Rimuove il filtro in scala di grigi */
  }

  .item:hover {
    transform: none; /* Disabilita l'hover per dispositivi mobili */
  }

  .polaroid {
    margin: 0 auto; /* Centra la polaroid */
    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  }

  .polaroid > img {
    width: 100%; /* Mantiene l'immagine adattata alla polaroid */
    height: auto; /* Mantiene le proporzioni */
  }
}
</style>
