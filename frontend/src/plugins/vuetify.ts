import { createVuetify } from 'vuetify';
import light from './light-theme';
import dark from './dark-theme';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
