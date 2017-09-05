import { CITIES, CITY_REQUEST, CITY_REQUEST_FAILED } from '@/store/types';
import { getCities } from '@/api/city';

const state = {
  currentCity: {},
  popularCities: [],
  groupCities: [],
  isFetching: false,
};

const getters = {
  sortGroupCity(mState) {
    const arr = mState.groupCities;
    const newArr = {};
    Object.keys(arr).sort().forEach((key) => {
      newArr[key] = arr[key];
    });
    return newArr;
  },
};

const actions = {
  getCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(CITY_REQUEST);
      getCities(payload).then((res) => {
        commit(CITIES, {
          type: payload.type,
          data: res.data,
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
      case 'guess':
        mState.currentCity = payload.data;
        break;
      case 'hot':
        mState.popularCities = payload.data;
        break;
      case 'group':
        mState.groupCities = payload.data;
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
  getters,
  actions,
  mutations,
};
