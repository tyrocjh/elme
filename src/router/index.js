import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/layout/Layout';
import Home from '@/pages/home/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        component: Home,
      }],
    },
  ],
});
