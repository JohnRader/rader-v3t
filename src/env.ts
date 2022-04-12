import { FirebaseOptions } from 'firebase/app';

export const nodeEnv = process.env.NODE_ENV;
export const port = process.env.PORT || 3000;

// Firebase configuration
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID
};

export const appName = process.env.APP_NAME;
