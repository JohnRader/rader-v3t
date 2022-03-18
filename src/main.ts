import { createApp } from 'vue';
import vuetify from './plugins/vuetify/vuetify';
import router from './router/app-router';
import firebaseApp from './services/firebase';
import App from './App.vue';

const app = createApp(App);

app.use(vuetify).use(router).mount('#app');
