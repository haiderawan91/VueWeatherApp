import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createPinia } from 'pinia';
import { piniaPersist } from './piniaPersist';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist) 
app.use(router);
app.use(pinia);

app.mount('#app');
