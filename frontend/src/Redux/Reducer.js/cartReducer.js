import {
  ADD_TO_CART,
  CART_DATA_REQUEST,
  EMPTY_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../Constants";

const initialState = { cart: [] };

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

    case EMPTY_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
