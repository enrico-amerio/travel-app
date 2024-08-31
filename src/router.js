import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import TravelDetail from "./pages/TravelDetail.vue";
import AddTravel from "./pages/AddTravel.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/travel/:id",
        name: "TravelDetail",
        component: TravelDetail,
    },
    {
      path: "/add-travel", // Nuova rotta per aggiungere una vacanza
      name: "addTravel",
      component: AddTravel,
    }
  ]
})
export { router };