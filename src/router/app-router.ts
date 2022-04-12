import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/services/auth/auth-service';
import { UserStore } from '@/stores/user-store';

export enum RouteNames {
  HomePage = 'homePage',
  AccountPage = 'accountPage',
  LandingPage = 'landingPage',
  SignInRegisterPage = 'signInRegisterPage',
}

const HomePage = async () => import('@/pages/Home.vue');
const AccountPage = async () => import('@/pages/Account.vue');
const LandingPage = async () => import('@/pages/LandingPage.vue');
const SignInRegisterPage = async () => import('@/pages/SignInRegister.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RouteNames.LandingPage,
      path: '/',
      component: LandingPage,
    },
    {
      name: RouteNames.HomePage,
      path: '/home',
      component: HomePage,
    },
    {
      name: RouteNames.AccountPage,
      path: '/account',
      component: AccountPage,
      beforeEnter: async (to, from, next): Promise<void> => {
        await AuthService.authenticated;
        const { currentUser } = await AuthService.auth;

        // After login, continue to account page
        if (currentUser && from.name === RouteNames.SignInRegisterPage) {
          return next();
        }

        // Get user data on page load
        if (currentUser) {
          const { getUser } = UserStore();
          await getUser(currentUser.uid);
          return next();
        }

        if (!currentUser) {
          return next({ name: RouteNames.SignInRegisterPage });
        }
      }
    },
    {
      name: RouteNames.SignInRegisterPage,
      path: '/signin',
      component: SignInRegisterPage,
      beforeEnter: async (to, from, next): Promise<void> => {
        await AuthService.authenticated;
        const { currentUser } = await AuthService.auth;

        if (currentUser) {
          return next({ name: RouteNames.AccountPage });
        }
        return next();
      }
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});

export default router;
