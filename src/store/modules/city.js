import { CITIES, CITY_REQUEST, CITY_REQUEST_FAILED } from '@/store/types';
import { getCities } from '@/api/city';

const state = {
  popularCities: [],
  isFetching: false,
};

const actions = {
  getCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(CITY_REQUEST);
      getCities(payload).then((res) => {
        commit(CITIES, {
          type: payload.type,
          cities: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(CITY_REQUEST_FAILED);
        reject(err);
      });
    });
  },
};

const mutations = {
  [CITIES](mState, payload) {
    mState.isFetching = false;
    switch (payload.type) {
      case 'hot':
        mState.popularCities = payload.cities;
        break;
      default:
    }
  },
  [CITY_REQUEST](mState) {
    mState.isFetching = true;
  },
  [CITY_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  actions,
  mutations,
};
