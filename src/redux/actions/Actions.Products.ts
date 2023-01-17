import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResObjType } from "../../utils/Types.Redux";

export const fetchAllProducts = createAsyncThunk<
  Partial<ResObjType>,
  void,
  { rejectValue: Pick<ResObjType, "error"> }
>("products/fetchProducts", async (_, thunkApi) => {
  return fetch("https://dummyjson.com/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data: Pick<ResObjType, "products">) => data)
    .catch((err: Pick<ResObjType, "error">) => thunkApi.rejectWithValue(err));
});
