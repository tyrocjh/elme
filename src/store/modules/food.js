import { FOOD_TYPES, FOOD_CATEGORY, FOOD_REQUEST, FOOD_REQUEST_FAILED } from '@/store/types';
import { getFoodTypes, getFoodCategory } from '@/api/food';

const state = {
  foodTypes: [],
  foodCategory: [],
  isFetching: false,
};

const getters = {
  getCatById: mState => id => mState.foodCategory.find(cat => cat.id === id),
  getSubCatById: (mState, mGetters) => (id) => {
    const cat = mGetters.getCatById(id);
    return cat ? cat.sub_categories : [];
  },
};

const actions = {
  getFoodTypes({ commit }, geohash) {
    return new Promise((resolve, reject) => {
      commit(FOOD_REQUEST);
      getFoodTypes(geohash).then((res) => {
        commit(FOOD_TYPES, {
          data: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(FOOD_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getFoodCategory({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit(FOOD_REQUEST);
      getFoodCategory(params.latitude, params.longitude).then((res) => {
        commit(FOOD_CATEGORY, {
          data: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(FOOD_REQUEST_FAILED);
        reject(err);
      });
    });
  },
};

const mutations = {
  [FOOD_TYPES](mState, payload) {
    mState.isFetching = false;
    mState.foodTypes = payload.data;
  },
  [FOOD_CATEGORY](mState, payload) {
    mState.isFetching = false;
    mState.foodCategory = payload.data;
  },
  [FOOD_REQUEST](mState) {
    mState.isFetching = true;
  },
  [FOOD_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
