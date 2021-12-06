import { LOAD_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
  isLoading:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      state.orders = action.orderData;
      return state;
  }
  return state;
};
