import { createRouter, createWebHistory } from 'vue-router';
import auth from '@/services/auth/auth';

export enum RouteNames {
  HomePage = 'homePage',
  AccountPage = 'accountPage',
  LandingPage = 'landingPage',
  SignInRegisterPage = 'signInRegisterPage',
}

const HomePage = async () => await import('@/pages/Home.vue');
const AccountPage = async () => await import('@/pages/Account.vue');
const LandingPage = async () => await import('@/pages/LandingPage.vue');
const SignInRegisterPage = async () => await import('@/pages/SignInRegister.vue');

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
      beforeEnter: (to, from, next): void => {
        const { currentUser } = auth;
        if (!currentUser) {
          return next({ name: RouteNames.SignInRegisterPage });
        } else {
          return next();
        }
      }
    },
    {
      name: RouteNames.SignInRegisterPage,
      path: '/signin',
      component: SignInRegisterPage,
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});

export default router;
