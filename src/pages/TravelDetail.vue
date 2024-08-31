<script>
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';  

export default {
  data() {
    return {
      travel: null,
      map: null,
      newPlaceDay: {
        date: '',
      },
      newPlace: {
        title: '',
        description: '',
        image: '',
        food: '',
        curiosities: '',
        notes: '',
        rating: 0,
        visited: false,
        address: '',   
        city: '',      
        latitude: '',  
        longitude: ''  
      }
    };
  },
  computed: {
    completionPercentage() {
      if (!this.travel || !this.travel.days.length) {
        return 0;
      }

      const totalPlaces = this.travel.days.reduce((sum, day) => sum + day.places.length, 0);
      const visitedPlaces = this.travel.days.reduce((sum, day) => sum + day.places.filter(place => place.visited).length, 0);

      return Math.round((visitedPlaces / totalPlaces) * 100);
    }
  },
  mounted() {
    this.loadTravel();
  },
  watch: {
    '$route.params.id': 'loadTravel'
  },
  methods: {
    loadTravel() {
      const storedTravels = JSON.parse(localStorage.getItem('travels')) || [];
      this.travel = storedTravels.find(t => t.id == this.$route.params.id);

      this.$nextTick(() => {
        this.initializeMap();

        if (this.map) {
          this.travel.days.forEach(day => {
            day.places.forEach(place => {
              this.addMarkerToMap(place.latitude, place.longitude, place.title);
            });
          });
        }
      });
    },
    async addPlace() {
      if (this.newPlaceDay.date && this.newPlace.address && this.newPlace.city) {
        try {
          const coordinates = await this.getCoordinates(this.newPlace.address, this.newPlace.city);
          if (coordinates) {
            this.newPlace.latitude = coordinates.lat;
            this.newPlace.longitude = coordinates.lng;
            let day = this.travel.days.find(d => d.date === this.newPlaceDay.date);
            if (!day) {
              day = { date: this.newPlaceDay.date, places: [] };
              this.travel.days.push(day);
            }

            day.places.push({ ...this.newPlace });
            this.travel.days.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            this.saveTravel();
            this.addMarkerToMap(this.newPlace.latitude, this.newPlace.longitude, this.newPlace.title);
            this.resetNewPlace();
            this.newPlaceDay.date = '';
            alert('Tappa aggiunta con successo!');
          } else {
            alert('Impossibile ottenere le coordinate per l\'indirizzo fornito.');
          }
        } catch (error) {
          console.error('Errore nel recupero delle coordinate:', error);
          alert('Errore nel recupero delle coordinate.');
        }
      } else {
        alert('Specificare una data valida e un indirizzo.');
      }
    },
    async getCoordinates(address, city) {
      const apiKey = 'AIzaSyALXd8XSD9pP45eLG-0S6YLPdmD-mCN71E';  // Sostituisci con la tua chiave API di Google
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', ' + city)}&key=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        if (response.data.status === 'OK') {
          const { lat, lng } = response.data.results[0].geometry.location;
          return { lat, lng };
        }
      } catch (error) {
        console.error('Errore nella chiamata API:', error);
      }
      return null;
    },
    saveTravel() {
      const storedTravels = JSON.parse(localStorage.getItem('travels')) || [];
      const index = storedTravels.findIndex(t => t.id == this.travel.id);
      if (index !== -1) {
        storedTravels[index] = this.travel;
        localStorage.setItem('travels', JSON.stringify(storedTravels));
        this.loadTravel();
      }
    },
    resetNewPlace() {
      this.newPlace = {
        title: '',
        description: '',
        image: '',
        food: '',
        curiosities: '',
        notes: '',
        rating: 0,
        visited: false,
        address: '',
        city: '',
        latitude: '',
        longitude: ''
      };
    },
    initializeMap() {
      if (!this.map && document.getElementById('map')) {
        this.map = L.map('map').setView([41.9028, 12.4964], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(this.map);
      }
    },
    addMarkerToMap(lat, lng, title) {
      if (this.map && lat && lng) {
        L.marker([lat, lng]).addTo(this.map)
          .bindPopup(title)
          .openPopup();
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy', { locale: it });
    },
    updateRating(place, newRating) {
      place.rating = newRating;
      this.saveTravel();
    },
    toggleVisited(place) {
      place.visited = !place.visited;
      this.saveTravel();
    },
    removePlace(day, place) {
      const placeIndex = day.places.indexOf(place);
      if (placeIndex > -1) {
        day.places.splice(placeIndex, 1);
        if (day.places.length === 0) {
          const dayIndex = this.travel.days.indexOf(day);
          if (dayIndex > -1) {
            this.travel.days.splice(dayIndex, 1);
          }
        }
        this.saveTravel();
        alert('Tappa rimossa con successo!');
      }
    }
  }
};
</script>

<template>
  <div class="container" v-if="travel">
    <!-- Freccia per tornare alla homepage -->
    <router-link to="/" class="back-arrow">
      <i class="fas fa-arrow-left"></i> Torna alla Home
    </router-link>
    <h1 class="py-4 text-center">
      {{ travel.title }}
      <!-- Bottone per aprire la modale -->
      <button type="button" class="button-19 blue-btn ms-3" data-bs-toggle="modal" data-bs-target="#addPlaceModal">
        Aggiungi Tappa
      </button>
    </h1>
    
    <!-- Mappa -->
    <div id="map" style="height: 400px;" class="mb-4"></div>

    <!-- Barra di percentuale completamento -->
    <div class="progress mb-4">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: completionPercentage + '%' }"
        :aria-valuenow="completionPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ completionPercentage }}%
      </div>
    </div>

    <!-- Visualizzazione dei giorni esistenti e delle tappe -->
    <div v-for="day in travel.days" :key="day.date" class="mb-4">
      <h2 class="text-center">{{ formatDate(day.date) }}</h2>
      <div v-for="place in day.places" :key="place.title" class="card mb-2">
        <div class="card-body d-md-flex">
          <div class="col-md-6">
            <img :src="place.image" alt="Immagine del luogo" class="card-img">
          </div>
          <div class="ms-5 col-md-6">
            <h3 class="my-4 my-md-0">{{ place.title }}</h3>
            <p class="card-text">{{ place.description }}</p>
            
            <!-- Note -->
            <div class="mb-3">
              <label for="placeNotes">Note:</label>
              <textarea class="form-control w-75 mt-3" v-model="place.notes" @change="saveTravel"></textarea>
            </div>
            
            <!-- Valutazione -->
            <div class="mb-3">
              <label for="placeRating">Valutazione:</label>
              <input type="range" class="form-range w-75 pt-3 ms-sm-0 ms-lg-2" min="0" max="5" step="1" id="customRange3" v-model="place.rating" @change="updateRating(place, $event.target.value)">
            </div>
            
            <!-- Visitato -->
            <div class="mb-3">
              <input type="checkbox" :checked="place.visited" @change="toggleVisited(place)">
              <label class="ms-2">Visitato</label>
            </div>

            <!-- Rimuovi Tappa -->
            <button @click="removePlace(day, place)" class="button-19 red-btn mt-2">Rimuovi Tappa</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="addPlaceModal" tabindex="-1" aria-labelledby="addPlaceModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addPlaceModalLabel">Aggiungi una Nuova Tappa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addPlace">
              <div class="mb-3">
                <label for="dayDate" class="form-label">Data</label>
                <input type="date" class="form-control" v-model="newPlaceDay.date" required>
              </div>
              <div class="mb-3">
                <label for="placeTitle" class="form-label">Titolo</label>
                <input type="text" class="form-control" v-model="newPlace.title" required>
              </div>
              <div class="mb-3">
                <label for="placeDescription" class="form-label">Descrizione</label>
                <textarea class="form-control" v-model="newPlace.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="placeImage" class="form-label">Immagine (URL)</label>
                <input type="text" class="form-control" v-model="newPlace.image" required>
              </div>
              <div class="mb-3">
                <label for="placeAddress" class="form-label">Indirizzo</label>
                <input type="text" class="form-control" v-model="newPlace.address" required>
              </div>
              <div class="mb-3">
                <label for="placeCity" class="form-label">Città</label>
                <input type="text" class="form-control" v-model="newPlace.city" required>
              </div>
              <div class="mb-3">
                <label for="placeRating" class="form-label">Valutazione (0-5)</label>
                <input type="number" class="form-control" v-model="newPlace.rating" min="0" max="5" required>
              </div>
              <button type="submit" class="button-19 blue-btn mb-3" data-bs-dismiss="modal">Aggiungi Tappa</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.card-img{
  max-height: 300px;
  object-fit: cover;
}
.form-control{
  max-width: 90%;
}
.button-19 {
  text-decoration: none;
  appearance: button;
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
.blue-btn{
  background-color: #1899D6;

}
.blue-btn:after{

  background-color: #1CB0F6;
}
.red-btn{
  background-color: #bc2525;
  
}
.red-btn:after{
  background-color: #ff0000;

}
.button-19:after {
  background-clip: padding-box;
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
