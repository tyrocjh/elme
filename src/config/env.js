let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://cangdu.org:8001';
} else {
  baseUrl = 'http://cangdu.org:8001';
}

export {
  baseUrl,
};
