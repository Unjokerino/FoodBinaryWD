import { combineReducers } from "redux";
import { cartSlice } from "./cart";
import { productsSlice } from "./products";

export default combineReducers({
  cart: cartSlice.reducer,
  products: productsSlice.reducer,
});
