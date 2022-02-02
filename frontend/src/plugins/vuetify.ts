import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          surface: '#424242',
          background: '#0D1117',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#212121',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        dark: false,
        variables: {},
      },
      dark: {
        colors: {
          surface: '#424242',
          background: '#616161',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#212121',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        dark: true,
        variables: {},
      },
    },
  },
});

export default vuetify;
