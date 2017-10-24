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
    const { latitude, longitude, offset, restaurantCategoryId } = params;
    return new Promise((resolve, reject) => {
      commit(SHOP_REQUEST);
      getShopList(latitude, longitude, offset, restaurantCategoryId).then((res) => {
        commit(SHOP_LIST, {
          data: res.data,
        });
        resolve(res.data);
      }).catch((err) => {
        commit(SHOP_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  changeOffset({ commit }) {
    commit(SHOP_OFFSET);
  },
};

const mutations = {
  [SHOP_LIST](mState, payload) {
    mState.isFetching = false;
    mState.shopList = [...mState.shopList, ...payload.data];
  },
  [SHOP_OFFSET](mState) {
    mState.offset += mState.limit;
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
