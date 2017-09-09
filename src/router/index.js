import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/Home';
import City from '@/pages/city/City';
import Msite from '@/pages/msite/Msite';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    }, {
      path: '/home',
      component: Home,
    }, {
      path: '/city/:id',
      component: City,
    }, {
      path: '/msite',
      component: Msite,
      meta: { keepAlive: true },
    },
  ],
});
