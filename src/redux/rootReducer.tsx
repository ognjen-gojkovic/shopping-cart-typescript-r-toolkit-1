import { combineReducers } from "@reduxjs/toolkit";
import reducerProducts from "./reducers/Reducer.Products";
import reducerCart from "./reducers/Reducer.Cart";

export const rootReducer = combineReducers({
  reducerProducts,
  reducerCart,
});
