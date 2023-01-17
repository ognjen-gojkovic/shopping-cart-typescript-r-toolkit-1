import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../utils/Types";

export type CartType = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
};

const initialState: CartType = {
  cart: [],
  totalItems: 0,
  totalPrice: 0.0,
};

const ReducerCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state: CartType, action: PayloadAction<Product>) => {
      let tempCart = [...state.cart];
      let tempPrice = 0;
      let flag = tempCart.find((item) => item.id === action.payload.id);
      if (flag) {
        tempCart.forEach((item) => {
          if (item.id === action.payload.id) {
            item.qty += 1;
            tempPrice = tempPrice + action.payload.price;
          }
          return item;
        });
      } else {
        tempCart.push({ ...action.payload, qty: 1 });
        tempPrice = tempPrice + action.payload.price;
      }
      state.cart = tempCart;
      state.totalPrice = state.totalPrice + tempPrice;
    },
    removeItem: (state: CartType, action: PayloadAction<number>) => {
      let totalPrc = state.totalPrice;
      state.cart = state.cart.filter((item: CartItem) => {
        if (item.id === action.payload) {
          totalPrc -= item.price * item.qty;
        }

        return item.id !== action.payload;
      });
      state.totalPrice = totalPrc;
    },
    calcTotal: (state: CartType) => {
      let tPrice: number = 0,
        tQty: number = 0;
      state.cart.forEach((item) => {
        tPrice += item.price * item.qty;
        tQty += item.qty;
      });
      state.totalItems = tQty;
      state.totalPrice = tPrice;
    },
    updateQuantity: (
      state: CartType,
      action: PayloadAction<{ id: number; opt?: string }>
    ) => {
      let totalPrc = state.totalPrice;
      state.cart = state.cart.map((item: CartItem) => {
        if (action.payload.opt === "plus") {
          if (item.id === action.payload.id) {
            item.qty += 1;
            totalPrc += item.price;
          }
        } else {
          if (item.id === action.payload.id) {
            if (item.qty === 1) return item;
            item.qty -= 1;
            totalPrc -= item.price;
          }
        }
        return item;
      });
      state.totalPrice = totalPrc;
    },
    setCart: (state: CartType, action: PayloadAction<CartType>) => {
      console.log("action:", action.payload);
      state = { ...action.payload };
    },
    submit: (state: CartType, action?: PayloadAction) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  addItem,
  calcTotal,
  removeItem,
  submit,
  updateQuantity,
  setCart,
} = ReducerCart.actions;

export default ReducerCart.reducer;
