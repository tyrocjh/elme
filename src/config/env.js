/* eslint-disable import/no-mutable-exports */
let baseUrl = 'http://cangdu.org:8001';
let imgBaseUrl = 'http://images.cangdu.org/';

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://cangdu.org:8001';
  imgBaseUrl = 'http://images.cangdu.org/';
}

export {
  baseUrl,
  imgBaseUrl,
};
