import fetch from '@/utils/fetch';

export function getCities(params) {
  return fetch({
    url: '/v1/cities',
    method: 'get',
    params,
  });
}

export function test() {
  return '';
}
