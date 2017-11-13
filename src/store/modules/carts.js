/* eslint-disable max-len */
import { CARTS_GET, CARTS_ADD, CARTS_REMOVE, CARTS_REQUEST, CARTS_REQUEST_FAILED } from '@/store/types';
import { getLocalStore, setLocalStore } from '@/utils/storage';

const state = {
  shoppingCart: {},
  isFetching: false,
};

const getters = {
  getShop: mState => shopid => mState.shoppingCart[shopid],
  getCategory: (mState, mGetters) => (shopid, catId) => {
    const shop = mGetters.getShop(shopid);
    return shop ? shop[catId] : '';
  },
  getFood: (mState, mGetters) => (shopid, catId, foodId) => {
    const category = mGetters.getCategory(shopid, catId);
    return category ? category[foodId] : '';
  },
  getFoodCount: (mState, mGetters) => (shopid, catId, foodId) => {
    const food = mGetters.getFood(shopid, catId, foodId);
    let count = 0;
    if (!food) {
      return 0;
    }
    const types = Object.keys(food);
    for (let i = 0; i < types.length; i += 1) {
      count += food[types[i]].count;
    }
    return count;
  },
};

const actions = {
  getCarts({ commit }) {
    commit(CARTS_GET);
  },
  addToCarts({ commit }, params) {
    commit(CARTS_ADD, {
      data: params,
    });
  },
  removeFromCarts({ commit }, params) {
    commit(CARTS_REMOVE, {
      data: params,
    });
  },
};

const mutations = {
  [CARTS_GET](mState) {
    mState.shoppingCart = JSON.parse(getLocalStore('shoppingCart')) || {};
  },
  [CARTS_ADD](mState, payload) {
    const { shopId, categoryId, foodId, specsId, name, price, specs, packingFee, skuId, stock } = payload.data;
    const carts = mState.shoppingCart;
    carts[shopId] = carts[shopId] || {};
    const shop = carts[shopId];
    shop[categoryId] = shop[categoryId] || {};
    const category = shop[categoryId];
    category[foodId] = category[foodId] || {};
    const food = category[foodId];
    if (food[specsId]) {
      food[specsId].count += 1;
    } else {
      food[specsId] = {
        id: specsId,
        name,
        price,
        specs,
        packingFee,
        skuId,
        stock,
        count: 1,
      };
    }
    mState.shoppingCart = { ...carts };
    setLocalStore('shoppingCart', mState.shoppingCart);
  },
  [CARTS_REMOVE](mState, payload) {
    const { shopId, categoryId, foodId, specsId } = payload.data;
    const carts = mState.shoppingCart;
    carts[shopId] = carts[shopId] || {};
    const shop = carts[shopId];
    shop[categoryId] = shop[categoryId] || {};
    const category = shop[categoryId];
    category[foodId] = category[foodId] || {};
    const food = category[foodId];
    if (food[specsId]) {
      if (food[specsId].count > 1) {
        food[specsId].count -= 1;
      } else {
        category[foodId] = null;
      }
    }
    mState.shoppingCart = { ...carts };
    setLocalStore('shoppingCart', mState.shoppingCart);
  },
  [CARTS_REQUEST](mState) {
    mState.isFetching = true;
  },
  [CARTS_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
