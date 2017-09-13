import { CURRENT_CITY, CITIES, SEARCH_CITIES, CITY_REQUEST, CITY_REQUEST_FAILED } from '@/store/types';
import { getCityById, getCities, searchCities, getCityByGeo } from '@/api/city';

const state = {
  currentCity: {},
  popularCities: [],
  groupCities: [],
  resultCities: [],
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
  getCityById({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(CITY_REQUEST);
      getCityById(id).then((res) => {
        commit(CURRENT_CITY, {
          data: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(CITY_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  getCityByGeo({ commit }, geohash) {
    return new Promise((resolve, reject) => {
      commit(CITY_REQUEST);
      getCityByGeo(geohash).then((res) => {
        commit(CURRENT_CITY, {
          data: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(CITY_REQUEST_FAILED);
        reject(err);
      });
    });
  },
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
  searchCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(CITY_REQUEST);
      searchCities(payload).then((res) => {
        commit(SEARCH_CITIES, {
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
  [CURRENT_CITY](mState, payload) {
    mState.isFetching = false;
    mState.currentCity = payload.data;
  },
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
  [SEARCH_CITIES](mState, payload) {
    mState.isFetching = false;
    mState.resultCities = payload.data;
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
