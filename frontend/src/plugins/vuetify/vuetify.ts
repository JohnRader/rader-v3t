import { createVuetify } from 'vuetify';
import * as components from 'vuetify/lib/components/index'
import * as directives from 'vuetify/lib/directives/index'
import light from './light-theme';
import dark from './dark-theme';

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VAppBar: {
      flat: true,
    },
    VBtn: {
      color: 'primary',
      height: 44,
      rounded: 'lg',
    },
    VSheet: {
      color: '#212121',
    },
  },
  locale: { defaultLocale: 'en' },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
});

export default vuetify;
