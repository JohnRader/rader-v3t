import { firebaseConfig } from '@/env';
import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;