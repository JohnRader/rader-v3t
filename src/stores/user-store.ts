import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import router, { RouteNames } from '@/router/app-router';
import AuthService from '@/services/auth/auth-service';

import {
  addUser,
  setUserPreferences,
  getUserData
} from '@/services/user/user-service';
import {
  User,
  RegisterUserRequest,
  UpdatePreferencesRequest,
  UserPreferences
} from '@/models/user-model';

import type { UserLogin, UserRegister } from '@/services/auth/auth-service';

export interface LoginRequest {
  authProvider: string;
  email: string;
  password: string;
}

interface UserState {
  loading: boolean;
  uid: string | null | undefined;
  user: User | null;
}

export const getLocalStoragePreferences = (): UserPreferences => {
  const local = localStorage.getItem('preferences') as string;
  if (!local) {
    localStorage.setItem('preferences', JSON.stringify({ darkMode: false }));
  }
  return JSON.parse(localStorage.getItem('preferences') as string);
};

export const updateLocalStoragePreferences = (
  preferences?: UserPreferences
): void => {
  if (preferences) {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }
};

export const UserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    loading: false,
    uid: null,
    user: null
  }),
  getters: {
    darkMode: (state): boolean => (
      state.user ? state.user.preferences.darkMode : getLocalStoragePreferences().darkMode
    )
  },
  actions: {
    // Binds user data to store instance after auth success
    async bindUser(): Promise<void> {
      await onAuthStateChanged(AuthService.auth, async (user) => {
        if (user) {
          const { uid } = user;
          if (uid) {
            console.log('User is logged in and user data already loaded');
            return;
          }
          try {
            console.log('User is logged in, loading user data');
            await this.getUser(uid);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('User is logged out');
        }
      });
    },
    async getUser(uid: string): Promise<void> {
      this.loading = true;
      try {
        const user = await getUserData(uid);
        this.uid = uid;
        this.user = user as User;
        console.log('User info from db loaded');
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    async saveUserPreferences(
      request: UpdatePreferencesRequest
    ): Promise<void> {
      this.loading = true;
      try {
        await setUserPreferences(request);
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    async register(request: UserRegister): Promise<void> {
      this.loading = true;
      const { userData } = request;

      try {
        // Firebase Auth Creation
        const user = await AuthService.userSignUp(request);
        if (user && user.uid) {
          this.uid = user.uid;
        } else {
          throw new Error('User auth creation failed');
        }

        // Firestore User Creation
        const { uid } = user;
        const newUser = new User({ uid, ...userData } as RegisterUserRequest);
        await addUser(JSON.parse(JSON.stringify(newUser)));

        if (user && user.uid) {
          await this.getUser(user.uid);
          this.loading = false;
          router.push({ name: RouteNames.AccountPage });
        }
      } catch (error: any) {
        this.loading = false;
        throw error;
      }
    },
    async login(request: UserLogin): Promise<void> {
      this.loading = true;

      try {
        const user = await AuthService.userLogIn(request);
        if (user && user.uid) {
          await this.getUser(user.uid);
          this.loading = false;
          router.push({ name: RouteNames.AccountPage });
        }
      } catch (error) {
        this.loading = false;
        throw error;
      }
    },
    async logOut(): Promise<void> {
      this.loading = true;

      try {
        await AuthService.userLogOut();
        this.uid = null;
        this.user = null;
        this.loading = false;
        router.push({ name: RouteNames.SignInRegisterPage });
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    async updateUserPreferences(preferences: UserPreferences): Promise<void> {
      updateLocalStoragePreferences(preferences);
      if (this.user && this.uid) {
        await this.saveUserPreferences({
          uid: this.uid,
          preferences
        });
        await this.getUser(this.uid);
      }
    }
  }
});
