import Vue from 'vue';
import Vuex from 'vuex';

import city from './modules/city';
import food from './modules/food';
import shop from './modules/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    city,
    food,
    shop,
  },
});
