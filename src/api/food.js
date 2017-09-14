import fetch from '@/utils/fetch';

export function getFoodTypes(geohash) {
  return fetch({
    url: '/v2/index_entry',
    method: 'get',
    params: {
      geohash,
      group_type: '1',
      'flags[]': 'F',
    },
  });
}

export function test() {
  return null;
}
