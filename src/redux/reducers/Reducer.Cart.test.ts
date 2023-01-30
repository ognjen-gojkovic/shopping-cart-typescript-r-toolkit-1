import { mockProducts } from "../../utils/mockProducts";
import { reduxStore } from "../reduxStore";
import { addItem, removeItem, updateQuantity, submit } from "./Reducer.Cart";

describe("reducer cart", () => {
  test("should add item to empty cart", () => {
    // validate that cart is empty
    let reducerCart = reduxStore.getState().reducerCart;
    expect(reducerCart.cart).toEqual([]);
    expect(reducerCart.totalPrice).toEqual(0);

    reduxStore.dispatch(addItem(mockProducts.products[0]));
    reduxStore.dispatch(addItem(mockProducts.products[1]));

    reducerCart = reduxStore.getState().reducerCart;
    const totalPrc = mockProducts.products.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    expect(reducerCart.cart[0]).toEqual({
      ...mockProducts.products[0],
      qty: 1,
    });
    expect(reducerCart.cart.length).toBe(2);
    expect(reducerCart.totalPrice).toEqual(totalPrc);
  });

  test("should increment quantity of the item in cart two times", () => {
    reduxStore.dispatch(
      updateQuantity({ id: mockProducts.products[0].id, opt: "plus" })
    );
    reduxStore.dispatch(
      updateQuantity({ id: mockProducts.products[0].id, opt: "plus" })
    );

    const totalPrc = reduxStore
      .getState()
      .reducerCart.cart.reduce((prev, item) => {
        return prev + item.price * item.qty;
      }, 0);

    expect(reduxStore.getState().reducerCart.cart[0].qty).toBe(3);
    expect(reduxStore.getState().reducerCart.totalPrice).toBe(totalPrc);
  });

  test("should decrement quantity of the item in cart one time", () => {
    reduxStore.dispatch(updateQuantity({ id: mockProducts.products[0].id }));

    const totalPrc = reduxStore
      .getState()
      .reducerCart.cart.reduce((prev, item) => {
        return prev + item.price * item.qty;
      }, 0);

    expect(reduxStore.getState().reducerCart.cart[0].qty).toBe(2);
    expect(reduxStore.getState().reducerCart.totalPrice).toBe(totalPrc);
  });

  test("should delete one item from cart", () => {
    reduxStore.dispatch(removeItem(mockProducts.products[0].id));

    const totalPrc = reduxStore
      .getState()
      .reducerCart.cart.reduce((prev, item) => {
        return prev + item.price * item.qty;
      }, 0);

    expect(reduxStore.getState().reducerCart.cart.length).toBe(1);
    expect(reduxStore.getState().reducerCart.totalPrice).toBe(totalPrc);
  });

  test("should empty cart when payment is completed", () => {
    reduxStore.dispatch(submit());

    const totalPrc = reduxStore
      .getState()
      .reducerCart.cart.reduce((prev, item) => {
        return prev + item.price * item.qty;
      }, 0);

    expect(reduxStore.getState().reducerCart.cart.length).toBe(0);
    expect(reduxStore.getState().reducerCart.totalPrice).toBe(totalPrc);
  });
});
