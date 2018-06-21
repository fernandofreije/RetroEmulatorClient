import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Main from '@/components/Main';
import UploadRom from '@/components/UploadRom';
import RomList from '@/components/RomList';
import Register from '@/components/Register';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
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
