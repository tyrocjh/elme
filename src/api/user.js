import fetch from '@/utils/fetch';

export function getUser(userId) {
  return fetch({
    url: '/v1/user',
    method: 'get',
    params: {
      user_id: userId,
    },
  });
}

export function accountLogin(params) {
  return fetch({
    url: '/v2/login',
    method: 'post',
    data: params,
  });
}
