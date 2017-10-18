import fetch from '@/utils/fetch';

export function getShopList(latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = []) {
  let supportStr = '';
  supportIds.forEach((item) => {
    if (item.status) {
      supportStr += `&support_ids[]=${item.id}`;
    }
  });

  return fetch({
    url: '/shopping/restaurants',
    method: 'get',
    params: {
      latitude,
      longitude,
      offset,
      restaurantCategoryId,
      'restaurant_category_ids[]': restaurantCategoryIds,
      orderBy,
      'delivery_mode[]': deliveryMode + supportStr,
      limit: 20,
      'extras[]': 'activities',
      keyword: '',
    },
  });
}

export function toBeRemoved() {
  return null;
}