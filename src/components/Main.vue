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
    <router-link :to="{ name: 'addTravel' }" class="custom-btn">Nuova Vacanza</router-link>
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
.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
.polaroid-container {
  position: relative;
  display: inline-block; 
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
    width: 100%; 
    display: block;
    margin-top: 1rem;
    transform: none; 
    filter: none; 
  }

  .item:hover {
    transform: none; 
  }

  .polaroid {
    margin: 0 auto; 
    box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  }

  .polaroid > img {
    width: 100%; 
    height: auto; 
  }
}
</style>
