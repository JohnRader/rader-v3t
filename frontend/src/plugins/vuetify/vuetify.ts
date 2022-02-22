import '@/styles/sass/_vuetify-overrides.scss';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components/index'
import * as directives from 'vuetify/lib/directives/index'
import light from './light-theme';
import dark from './dark-theme';

const vuetify = createVuetify({
  components,
  directives,
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
