import { createRouter, createWebHistory } from 'vue-router';

export enum RouteNames {
  HomePage = 'homePage',
  AccountPage = 'accountPage',
  LandingPage = 'landingPage',
}

const HomePage = async () => await import('@/pages/Home.vue');
const AccountPage = async () => await import('@/pages/Account.vue');
const LandingPage = async () => await import('@/pages/LandingPage.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RouteNames.LandingPage,
      path: '/',
      component: LandingPage,
    },
    {
      name: RouteNames.AccountPage,
      path: '/account',
      component: AccountPage,
    },
    {
      name: RouteNames.HomePage,
      path: '/home',
      component: HomePage,
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});

export default router;
