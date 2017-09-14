import { FOOD_TYPES, FOOD_REQUEST, FOOD_REQUEST_FAILED } from '@/store/types';
import { getFoodTypes } from '@/api/food';

const state = {
  foodTypes: [],
  isFetching: false,
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
};

const mutations = {
  [FOOD_TYPES](mState, payload) {
    mState.isFetching = false;
    mState.foodTypes = payload.data;
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
  actions,
  mutations,
};
