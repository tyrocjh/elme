import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/Home';
import City from '@/pages/city/City';
import Msite from '@/pages/msite/Msite';
import Food from '@/pages/food/Food';
import Shop from '@/pages/shop/Shop';
import ShopDetail from '@/pages/shop/ShopDetail';
import ShopSafe from '@/pages/shop/ShopSafe';
import FoodDetail from '@/pages/shop/FoodDetail';

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
    }, {
      path: '/food',
      component: Food,
    }, {
      path: '/shop',
      component: Shop,
      children: [{
        path: 'foodDetail',
        component: FoodDetail,
      }, {
        path: 'shopDetail',
        component: ShopDetail,
        children: [{
          path: 'shopSafe',
          component: ShopSafe,
        }],
      }],
    },
  ],
});
