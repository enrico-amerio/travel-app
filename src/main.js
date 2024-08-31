import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap';
import { router } from "./router.js";
import App from './App.vue'

createApp(App).use(router).mount('#app')
