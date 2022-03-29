import { defineStore } from 'pinia';
import router, { RouteNames } from '@/router/app-router';
import AuthService from '@/services/auth/auth-service';

import { onAuthStateChanged } from 'firebase/auth';
import { addUser, updateUserPreferences, getUserData } from '@/services/user/user-service';
import { User, RegisterUserRequest, UpdatePreferencesRequest, UserPreferences } from '@/models/user-model';

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

export const getLocalStoragePreferences = (): UserPreferences | null => {
  const local = localStorage.getItem('preferences');
  if (local) {
    return JSON.parse(local);
  } else {
    return null;
  }
};

export const updateLocalStoragePreferences = (preferences?: UserPreferences): void => {
  if (preferences) {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  } else {
    localStorage.removeItem('preferences');
  }
}

export const UserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    loading: false,
    uid: null,
    user: null,
  }),
  getters: {
    darkMode: (state): boolean => {
      return state.user ? state.user.preferences.darkMode : false;
    }
  },
  actions: {
    // Binds user data to store instance after auth success
    async bindUser(): Promise<void> {
      await onAuthStateChanged(AuthService.auth, async (user) => {
        if (user) {
          const { uid } = user;
          if (uid) { console.log('User is logged in and user data already loaded'); return; }
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
        this.loading = false;
        console.log('User info from db loaded');
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    async modifyUserPreferences(request: UpdatePreferencesRequest): Promise<void> {
      this.loading = true;

      try {
        await updateUserPreferences(request);
        this.loading = false;
        router.go(0);  // resets the route to refresh page, load local storage changes, and trigger beforeEnter route hooks
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
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
        await addUser(JSON.parse(JSON.stringify((newUser))));

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
        router.push({ name: RouteNames.LandingPage });
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    updateLocalPreferences(preferences: UserPreferences): void {
      updateLocalStoragePreferences(preferences);
      if (this.user) {
        this.user.preferences = preferences;
      }
    },
  },
});
