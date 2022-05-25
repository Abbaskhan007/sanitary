import {
  ADD_TO_CART,
  CART_DATA_REQUEST,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_DETAILS,
  UPDATE_CART,
} from "../Constants";

const initialState = { cart: [], shipping: {}, payment: "bank" };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_DATA_REQUEST:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, payment: action.payload };
    case SAVE_SHIPPING_DETAILS:
      return { ...state, shipping: action.payload };
    case EMPTY_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
