import { USER_INFO, USER_REQUEST, USER_REQUEST_FAILED } from '@/store/types';
import { getUser, accountLogin } from '@/api/user';
import { setLocalStore } from '@/utils/storage';

const state = {
  userInfo: null,
  isFetching: false,
};

const actions = {
  getUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST);
      getUser(userId).then((res) => {
        const data = res.data;
        if (data.user_id) {
          commit(USER_INFO, {
            data,
          });
          resolve(data);
        }
      }).catch((err) => {
        commit(USER_REQUEST_FAILED);
        reject(err);
      });
    });
  },
  accountLogin({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST);
      accountLogin(params).then((res) => {
        const data = res.data;
        if (data.user_id) {
          commit(USER_INFO, {
            data,
          });
          resolve(data);
        }
        reject(data);
      }).catch((err) => {
        commit(USER_REQUEST_FAILED);
        reject(err);
      });
    });
  },
};

const mutations = {
  [USER_INFO](mState, payload) {
    mState.isFetching = false;
    mState.userInfo = payload.data;
    setLocalStore('userId', payload.data.user_id);
  },
  [USER_REQUEST](mState) {
    mState.isFetching = true;
  },
  [USER_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  actions,
  mutations,
};
