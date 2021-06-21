import { createRouter, createWebHistory } from 'vue-router';
import store from 'store';

const Login = () => import('views/login/Login.vue');
const HappyPage = () => import('views/happyPage/HappyPage.vue');
const FriendsPage = () => import('views/friendlistpage/FriendsPage.vue');

const routes = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: HappyPage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsPage,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth || store.state.loginStatus) {
    next();
  } else {
    next({
      name: 'login',
    });
  }
});

export default router;
