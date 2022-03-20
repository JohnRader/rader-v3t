import { createApp } from 'vue';
import pinia from './stores/store';
import vuetify from './plugins/vuetify/vuetify';
import router from './router/app-router';
import App from './App.vue';
import firebaseApp from './services/firebase';
import { UserStore } from './stores/user-store';

(async () => {
  const app = createApp(App);

  app.use(pinia);
  const { bindUser } = UserStore();
  await bindUser();

  app.use(router);
  app.use(vuetify);

  app.mount('#app');
})();


