import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk<any, void>(
  "products/fetchProducts",
  async (_, thunkApi) => {
    return fetch("https://dummyjson.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => thunkApi.rejectWithValue(err));
  }
);
