/* eslint-disable max-len */
import { SHOP_LIST, SHOP_OFFSET, SHOP_REQUEST, SHOP_REQUEST_FAILED } from '@/store/types';
import { getShopList } from '@/api/shop';

const state = {
  shopList: [],
  offset: 0,
  limit: 5,
  isFetching: false,
};

const actions = {
  getShopList({ commit }, params) {
    const { latitude, longitude, offset, restaurantCategoryId, restaurantCategoryIds, sortByType, reset } = params;
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getShopList(latitude, longitude, offset, restaurantCategoryId, restaurantCategoryIds, sortByType).then((res) => {
        commit(SHOP_LIST, {
          data: res.data,
          reset,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  changeOffset({ commit }, params = {}) {
    commit(SHOP_OFFSET, params);
  },
};

const mutations = {
  [SHOP_LIST](mState, payload) {
    mState.isFetching = false;
    mState.shopList = payload.reset ? payload.data : [...mState.shopList, ...payload.data];
  },
  [SHOP_OFFSET](mState, payload) {
    const count = typeof payload.count === 'number' ? payload.count : mState.limit;
    mState.offset = payload.reset ? count : (mState.offset + count);
  },
  [SHOP_REQUEST](mState) {
    mState.isFetching = true;
  },
  [SHOP_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  actions,
  mutations,
};
