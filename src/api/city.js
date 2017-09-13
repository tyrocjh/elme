import fetch from '@/utils/fetch';

export function getCityById(id) {
  return fetch({
    url: `/v1/cities/${id}`,
    method: 'get',
  });
}

export function getCityByGeo(geohash) {
  return fetch({
    url: `/v2/pois/${geohash}`,
    method: 'get',
  });
}

export function getCities(params) {
  return fetch({
    url: '/v1/cities',
    method: 'get',
    params,
  });
}

export function searchCities(params) {
  return fetch({
    url: '/v1/pois',
    method: 'get',
    params,
  });
}
