import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Main from '@/components/Main';
import UploadRom from '@/components/UploadRom';
import RomList from '@/components/RomList';
import Register from '@/components/Register';
import NesEmulator from '@/components/NesEmulator';
import UserData from '@/components/UserData';
import GameData from '@/components/GameData';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'RomList',
          meta: { requiresAuth: true },
          component: RomList
        },
        {
          path: '/uploadRom',
          name: 'UploadRom',
          meta: { requiresAuth: true },
          component: UploadRom
        },
        {
          path: '/emulate/',
          name: 'Emulator',
          meta: { requiresAuth: true },
          component: NesEmulator
        },
        {
          path: '/user/',
          name: 'User',
          meta: { requiresAuth: true },
          component: UserData
        },
        {
          path: '/game/',
          name: 'GameData',
          meta: { requiresAuth: true },
          component: GameData
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user.isAuth) next();
    else next('/login');
  } else next();
});

export default router;
