import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/Types";
import { ResObjType } from "../../utils/Types.Redux";
import { fetchAllProducts } from "../actions/Actions.Products";

export type INITIAL_STATE = {
  products: Product[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  error: object | null;
};

const initialState: INITIAL_STATE = {
  // products are hardcoded cuz it's frontend app example about cart
  // products: products.products,
  products: [],
  status: "IDLE",
  error: null,
};

const ReducerProducts = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllProducts.pending, (state: INITIAL_STATE) => {
      state.status = "LOADING";
    });
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state: INITIAL_STATE, action) => {
        state.status = "SUCCESS";
        if (action.payload.products) state.products = action.payload.products;
      }
    );
    builder.addCase(
      fetchAllProducts.rejected,
      (state: INITIAL_STATE, action) => {
        state.status = "ERROR";
        if (action.payload?.error) state.error = action.payload.error;
      }
    );
  },
});

const { reducer } = ReducerProducts;

export default reducer;
