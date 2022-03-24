import firebaseApp from '../firebase';
import { Auth, getAuth, signInWithEmailAndPassword, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { updateLocalStoragePreferences } from '@/stores/user-store';

import type { RegisterForm } from '@/components/login-register/RegisterForm.vue';

export enum AuthProvider {
  Email = 'email',
  Google = 'google.com',
  Facebook = 'facebook.com',
  GitHub = 'github.com',
  Phone = 'phone',
  Twitter = 'twitter.com',
}

// TODO: Move type definitions to separate file
interface BaseLoginRequest {
  email: string;
  password: string;
}

interface GoogleLoginRequest extends BaseLoginRequest {
  googleIdToken: string;
}

interface FacebookLoginRequest extends BaseLoginRequest {
  facebookIdToken: string;
}

interface GithubLoginRequest extends BaseLoginRequest {
  githubIdToken: string;
}

interface PhoneLoginRequest extends BaseLoginRequest {
  phoneIdToken: string;
}

interface TwitterLoginRequest extends BaseLoginRequest {
  twitterIdToken: string;
}

export interface AuthProviderRequests {
  [AuthProvider.Email]: BaseLoginRequest;
  [AuthProvider.Google]: GoogleLoginRequest,
  [AuthProvider.Facebook]: FacebookLoginRequest,
  [AuthProvider.GitHub]: GithubLoginRequest,
  [AuthProvider.Phone]: PhoneLoginRequest,
  [AuthProvider.Twitter]: TwitterLoginRequest,
}

interface UserAuthRequest {
  authProvider: AuthProvider;
}

export interface UserLogin extends UserAuthRequest {
  loginRequest: AuthProviderRequests[AuthProvider];
}

export interface UserRegister extends UserAuthRequest {
  registerRequest: AuthProviderRequests[AuthProvider];
  userData: RegisterForm;
}

const auth = getAuth(firebaseApp);

class AuthServiceClass {
  auth: Auth;
  authenticated: Promise<any>;

  constructor(auth: Auth) {
    this.auth = auth;
    this.authenticated = this.isAuthenticated();
  }

  // this allows us to wait for the initial auth-change event on page load
  async isAuthenticated(): Promise<unknown> {
    return this.initializeAuth().then((user) => {
      // @ts-ignore
      return user && !user.isAnonymous;
    });
  }

  async initializeAuth(): Promise<unknown> {
    return new Promise(resolve => {
      // this adds a hook for the initial auth-change event
      auth.onAuthStateChanged(user => {
        resolve(user)
      })
    })
  }

  public async userSignUp(register: UserRegister): Promise<User | void> {
    const { authProvider, registerRequest } = register;

    switch (authProvider) {
      case AuthProvider.Email:
        const { email, password } = registerRequest as AuthProviderRequests[AuthProvider.Email];
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          return user;
        } catch (error) {
          // TODO: Custom error handling
          throw error;
        }

      // TODO: Add other auth providers

      default:
        console.error('AuthProvider not supported');
    }
  }

  public async userLogIn(login: UserLogin): Promise<User | void> {
    const { authProvider, loginRequest } = login;

    switch (authProvider) {
      case AuthProvider.Email:
        const { email, password } = loginRequest as AuthProviderRequests[AuthProvider.Email];
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          return user;
        } catch (error) {
          // TODO: Custom error handling
          throw error;
        }

      // TODO: Add other auth providers

      default:
        console.error('AuthProvider not supported');
    }
  }

  public async userLogOut(): Promise<void> {
    await auth.signOut();
    updateLocalStoragePreferences();
  }
};

const AuthService = new AuthServiceClass(auth);

export default AuthService;
