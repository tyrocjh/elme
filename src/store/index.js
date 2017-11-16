import Vue from 'vue';
import Vuex from 'vuex';

import base from './modules/base';
import user from './modules/user';
import city from './modules/city';
import food from './modules/food';
import shop from './modules/shop';
import carts from './modules/carts';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    base,
    user,
    city,
    food,
    shop,
    carts,
  },
});
