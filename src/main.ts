import { createApp } from 'vue';
import pinia from './stores/store';
import vuetify from './plugins/vuetify/vuetify';
import router from './router/app-router';
import App from './App.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebaseApp from './services/firebase';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
