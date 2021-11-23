import { LOAD_PRODUCTS, LOAD_PRODUCT } from "../actions/products";


const initialState = {
  availableProducts: [],
  productDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
      };
    case LOAD_PRODUCT:
      return {
        ...state,
        productDetail: action.product,
      };
    default:
      return state;
  }
};
