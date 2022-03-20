import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, } from 'firebase/auth';
import auth from '@/services/auth/auth';
import router, { RouteNames } from '@/router/app-router';

import type { UserInfo } from 'firebase/auth';

interface EmailLogin {
  email: string;
  password: string;
}

interface UserState {
  user: UserInfo | null;
}

export const UserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async bindUser(): Promise<void> {
      await onAuthStateChanged(auth, async (user) => {
        this.user = user;
        if (user != null) {
          console.log('User is logged in');
        } else {
          console.log('User is logged out');
        }
      });
    },
    async register(payload: EmailLogin) {
      const { email, password } = payload;
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    },
    async loginWithEmail(payload: EmailLogin) {
      try {
        await signInWithEmailAndPassword(auth, payload.email, payload.password);
        router.push({ name: RouteNames.AccountPage });
      } catch (error) {
        throw error;
      }
    },
    async logOut() {
      try {
        await signOut(auth);
        router.push({ name: RouteNames.LandingPage });
      } catch (error) {
        throw error;
      }
    },
  },
});
