export const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "PageIndex" */ '../views/PageIndex.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "PageLogin" */ '../views/PageLogin.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "PageRegister" */ '../views/PageRegister.vue'),
  },
];
