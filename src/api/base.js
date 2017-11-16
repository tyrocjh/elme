/* eslint-disable import/prefer-default-export */
import fetch from '@/utils/fetch';

export function getCaptchas() {
  return fetch({
    url: '/v1/captchas',
    method: 'post',
  });
}
