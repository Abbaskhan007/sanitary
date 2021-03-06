import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducer.js/cartReducer";
import { modalReducer } from "./Reducer.js/modalReducer";
import { productReducer } from "./Reducer.js/productReducer";
import { storeReducer } from "./Reducer.js/StoreReducer";
import { userReducer } from "./Reducer.js/userReducer";
import { workerReducer } from "./Reducer.js/workerReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  productList: productReducer,
  user: userReducer,
  cart: cartReducer,
  store: storeReducer,
  worker: workerReducer,
  model: modalReducer,
});

export const store = createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(thunk))
);
