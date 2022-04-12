import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/env';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
