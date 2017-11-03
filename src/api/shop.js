import fetch from '@/utils/fetch';

export function getShopList(latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = [], limit = 5) {
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
      restaurant_category_id: restaurantCategoryId,
      'restaurant_category_ids[]': restaurantCategoryIds,
      orderBy,
      'delivery_mode[]': deliveryMode + supportStr,
      limit,
      'extras[]': 'activities',
      keyword: '',
    },
  });
}

export function getShopDetail(shopid, latitude, longitude) {
  return fetch({
    url: `/shopping/restaurant/${shopid}`,
    method: 'get',
    params: {
      latitude,
      longitude: `${longitude}&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics`,
    },
  });
}

export function getMenus(restaurantId) {
  return fetch({
    url: '/shopping/v2/menu',
    method: 'get',
    params: {
      restaurant_id: restaurantId,
    },
  });
}
