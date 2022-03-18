import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from '@vuetify/vite-plugin';
import path from 'path';

const pathSrc = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    mode,
    plugins: [
      vue(),
      vuetify({
        styles: 'expose',
      }),
    ],
    publicDir: 'assets',
    // TODO: rethink this and/or move object constructer to separate config file
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.FIREBASE_APIKEY': JSON.stringify(process.env.FIREBASE_APIKEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_PROJECTID': JSON.stringify(process.env.FIREBASE_PROJECTID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      'process.env.FIREBASE_APPID': JSON.stringify(process.env.FIREBASE_APPID),
      'process.env.APP_NAME': JSON.stringify(process.env.APP_NAME),
    },
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '${pathSrc}/styles/sass/_globals';`,
        },
      },
    },
  });
}


