import '@mdi/font/css/materialdesignicons.css';
import '@/styles/sass/_vuetify-overrides.scss';
import { createVuetify } from 'vuetify';
import light from './light-theme';
import dark from './dark-theme';

const vuetify = createVuetify({
  defaults: {
    // add vuetify component defaults here
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
