/* eslint-disable max-len */
import { CARTS_GET, CARTS_ADD, CARTS_REMOVE, CARTS_CLEAR, CARTS_REQUEST, CARTS_REQUEST_FAILED } from '@/store/types';
import { getLocalStore, setLocalStore } from '@/utils/storage';

const state = {
  shoppingCart: {},
  isFetching: false,
};

const getters = {
  getShop: mState => shopid => mState.shoppingCart[shopid],
  getCategory: (mState, mGetters) => (shopid, catId) => {
    const shop = mGetters.getShop(shopid);
    return shop ? shop[catId] : '';
  },
  getFood: (mState, mGetters) => (shopid, catId, foodId) => {
    const category = mGetters.getCategory(shopid, catId);
    return category ? category[foodId] : '';
  },
  getSelectedFoodByShop: (mState, mGetters) => (shopid) => {
    const selectedFood = [];
    const shop = mGetters.getShop(shopid);
    if (!shop) return [];
    Object.keys(shop).forEach((catId) => {
      const category = mGetters.getCategory(shopid, catId);
      if (category) {
        Object.keys(category).forEach((foodId) => {
          if (category[foodId]) {
            Object.keys(category[foodId]).forEach((specId) => {
              if (category[foodId][specId]) {
                const food = Object.assign({}, category[foodId][specId]);
                food.shopId = shopid;
                food.catId = catId;
                food.foodId = foodId;
                selectedFood.push(food);
              }
            });
          }
        });
      }
    });
    return selectedFood;
  },
  getPriceByShop: (mState, mGetters) => (shopid) => {
    const selectedFood = mGetters.getSelectedFoodByShop(shopid);
    if (selectedFood.length === 0) return 0;
    let price = 0;
    for (let i = 0; i < selectedFood.length; i += 1) {
      price += selectedFood[i].price * selectedFood[i].count;
    }
    return price;
  },
  getCountByShop: (mState, mGetters) => (shopid) => {
    let count = 0;
    const shop = mGetters.getShop(shopid);
    if (!shop) return count;
    Object.keys(shop).forEach((catId) => {
      const category = mGetters.getCategory(shopid, catId);
      if (category) {
        Object.keys(category).forEach((foodId) => {
          if (category[foodId]) {
            Object.keys(category[foodId]).forEach((specId) => {
              if (category[foodId][specId]) count += category[foodId][specId].count;
            });
          }
        });
      }
    });
    return count;
  },
  getCountByCat: (mState, mGetters) => (shopid, catId) => {
    let count = 0;
    const category = mGetters.getCategory(shopid, catId);
    if (!category) return count;
    Object.keys(category).forEach((foodId) => {
      if (!category[foodId]) return count;
      Object.keys(category[foodId]).forEach((specId) => {
        if (category[foodId][specId]) count += category[foodId][specId].count;
      });
    });
    return count;
  },
  getCountByFood: (mState, mGetters) => (shopid, catId, foodId) => {
    let count = 0;
    const food = mGetters.getFood(shopid, catId, foodId);
    if (!food) return count;
    Object.keys(food).forEach((specId) => {
      if (food[specId]) count += food[specId].count;
    });
    return count;
  },
};

const actions = {
  getCarts({ commit }) {
    commit(CARTS_GET);
  },
  addToCarts({ commit }, params) {
    commit(CARTS_ADD, {
      data: params,
    });
  },
  removeFromCarts({ commit }, params) {
    commit(CARTS_REMOVE, {
      data: params,
    });
  },
  clearCarts({ commit }, shopId) {
    commit(CARTS_CLEAR, {
      shopId,
    });
  },
};

const mutations = {
  [CARTS_GET](mState) {
    mState.shoppingCart = JSON.parse(getLocalStore('shoppingCart')) || {};
  },
  [CARTS_ADD](mState, payload) {
    const { shopId, categoryId, foodId, specsId, name, price, specs, packingFee, skuId, stock } = payload.data;
    const carts = mState.shoppingCart;
    carts[shopId] = carts[shopId] || {};
    const shop = carts[shopId];
    shop[categoryId] = shop[categoryId] || {};
    const category = shop[categoryId];
    category[foodId] = category[foodId] || {};
    const food = category[foodId];
    if (food[specsId]) {
      food[specsId].count += 1;
    } else {
      food[specsId] = {
        id: specsId,
        name,
        price,
        specs,
        packingFee,
        skuId,
        stock,
        count: 1,
      };
    }
    mState.shoppingCart = { ...carts };
    setLocalStore('shoppingCart', mState.shoppingCart);
  },
  [CARTS_REMOVE](mState, payload) {
    const { shopId, categoryId, foodId, specsId } = payload.data;
    const carts = mState.shoppingCart;
    carts[shopId] = carts[shopId] || {};
    const shop = carts[shopId];
    shop[categoryId] = shop[categoryId] || {};
    const category = shop[categoryId];
    category[foodId] = category[foodId] || {};
    const food = category[foodId];
    if (food[specsId]) {
      if (food[specsId].count > 1) {
        food[specsId].count -= 1;
      } else if (category[foodId].length === 1) {
        category[foodId] = null;
      } else {
        food[specsId] = null;
      }
    }
    mState.shoppingCart = { ...carts };
    setLocalStore('shoppingCart', mState.shoppingCart);
  },
  [CARTS_CLEAR](mState, payload) {
    const shopId = payload.shopId;
    const carts = mState.shoppingCart;
    carts[shopId] = null;
    mState.shoppingCart = { ...carts };
    setLocalStore('shoppingCart', mState.shoppingCart);
  },
  [CARTS_REQUEST](mState) {
    mState.isFetching = true;
  },
  [CARTS_REQUEST_FAILED](mState) {
    mState.isFetching = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
