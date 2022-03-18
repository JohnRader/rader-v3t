import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

export const auth = getAuth(firebaseApp);

// TODO: create types file for requests
interface EmailLogin {
  email: string;
  password: string;
};

export const login = async (credentials: EmailLogin): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('User is logged in');
  } else {
    console.log('User is logged out');
  }
});