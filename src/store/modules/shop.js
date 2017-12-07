/* eslint-disable max-len */
import { SHOP_LIST, SHOP_DETAIL, SHOP_MENUS, SHOP_RATING_SCORES, SHOP_RATING_TAGS, SHOP_RATING_LIST, SHOP_OFFSET, SHOP_REQUEST, SHOP_REQUEST_FAILED } from '@/store/types';
import { getShopList, getShopDetail, getMenus, getRatingScores, getRatingTags, getRatingList, searchShopList } from '@/api/shop';

const state = {
  shopList: [],
  shopDetail: [],
  menus: [],
  ratingScores: '',
  ratingTags: '',
  ratingList: [],
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
  getShopDetail({ commit }, params) {
    const { shopid, latitude, longitude } = params;
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getShopDetail(shopid, latitude, longitude).then((res) => {
        commit(SHOP_DETAIL, {
          data: res.data,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getMenus({ commit }, restaurantId) {
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getMenus(restaurantId).then((res) => {
        commit(SHOP_MENUS, {
          data: res.data,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getRatingScores({ commit }, shopid) {
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getRatingScores(shopid).then((res) => {
        commit(SHOP_RATING_SCORES, {
          data: res.data,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getRatingTags({ commit }, shopid) {
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getRatingTags(shopid).then((res) => {
        commit(SHOP_RATING_TAGS, {
          data: res.data,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getRatingList({ commit }, params) {
    const { shopId, offset, tagName, reset } = params;
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getRatingList(shopId, offset, tagName).then((res) => {
        commit(SHOP_RATING_LIST, {
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
  searchShopList({ commit }, params) {
    const { geohash, keyword } = params;
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      searchShopList(geohash, keyword).then((res) => {
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
  [SHOP_DETAIL](mState, payload) {
    mState.isFetching = false;
    mState.shopDetail = payload.data;
  },
  [SHOP_MENUS](mState, payload) {
    mState.isFetching = false;
    mState.menus = payload.data;
  },
  [SHOP_RATING_SCORES](mState, payload) {
    mState.isFetching = false;
    mState.ratingScores = payload.data;
  },
  [SHOP_RATING_TAGS](mState, payload) {
    mState.isFetching = false;
    mState.ratingTags = payload.data;
  },
  [SHOP_RATING_LIST](mState, payload) {
    mState.isFetching = false;
    mState.ratingList = payload.reset ? payload.data : [...mState.ratingList, ...payload.data];
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
