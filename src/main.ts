import { createApp } from 'vue'
import App from './App.vue'
import VWave from 'v-wave'

import router from './router';
import "./scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(VWave, {
  duration: 0.21
});

app.mount('#app')
