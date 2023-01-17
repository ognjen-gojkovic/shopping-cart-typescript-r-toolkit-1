import { INITIAL_STATE } from "../redux/reducers/Reducer.Products";
import { Product } from "./Types";

export type ResObjType = {
  status: boolean;
  products: Product[];
  error: object | null;
};

export type rootState = {
  ReducerProducts: INITIAL_STATE;
};
