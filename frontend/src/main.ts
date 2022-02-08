import { createApp } from 'vue';
import vuetify from './plugins/vuetify/vuetify';
import App from './App.vue';

const app = createApp(App);

app.use(vuetify).mount('#app');
