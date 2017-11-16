import { CAPTCHAS, BASE_REQUEST, BASE_REQUEST_FAILED } from '@/store/types';
import { getCaptchas } from '@/api/base';

const state = {
  captchas: '',
  isFetching: false,
};

const actions = {
  getCaptchas({ commit }) {
    return new Promise((resolve, reject) => {
      commit(BASE_REQUEST);
      getCaptchas().then((res) => {
        commit(CAPTCHAS, {
          data: res.data,
        });
        resolve(res);
      }).catch((err) => {
        commit(BASE_REQUEST_FAILED);
        reject(err);
      });
    });
  },
};

const mutations = {
  [CAPTCHAS](mState, payload) {
    mState.isFetching = false;
    mState.captchas = payload.data.code;
  },
  [BASE_REQUEST](mState) {
    mState.isFetching = true;
  },
  [BASE_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  actions,
  mutations,
};
