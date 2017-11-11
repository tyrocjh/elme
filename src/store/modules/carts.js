/* eslint-disable max-len */
import { CARTS_INIT, CARTS_ADD, CARTS_REQUEST, CARTS_REQUEST_FAILED } from '@/store/types';
import { getLocalStore, setLocalStore } from '@/utils/storage';

const state = {
  shoppingCart: {},
  isFetching: false,
};

const actions = {
  getCarts({ commit }) {
    commit(CARTS_INIT);
  },
  addToCarts({ commit }, params) {
    commit(CARTS_ADD, {
      data: params,
    });
  },
};

const mutations = {
  [CARTS_INIT](mState) {
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
  [CARTS_REQUEST](mState) {
    mState.isFetching = true;
  },
  [CARTS_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  actions,
  mutations,
};
