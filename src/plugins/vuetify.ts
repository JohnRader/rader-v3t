import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          surface: '#272724',
          background: '#424242',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
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
          surface: '#2196F3',
          background: '#424242',
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
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
