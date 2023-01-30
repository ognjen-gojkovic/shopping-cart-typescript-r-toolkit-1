import { fetchAllProducts } from "../actions/Actions.Products";
import reducerProducts, { initialState } from "../reducers/Reducer.Products";
import { mockProducts } from "../../utils/mockProducts";

describe("reducer products", () => {
  test("on pending should set loading state to true", async () => {
    // fetch products from server
    const newState = await reducerProducts(
      initialState,
      fetchAllProducts.pending
    );

    expect(newState.status).toEqual("LOADING");
    expect(newState.products).toEqual([]);
    expect(newState.error).toEqual(null);
  });

  test("on fullfilled should set loading state to false and set products", async () => {
    // fetch products from server
    const newState = await reducerProducts(
      initialState,
      fetchAllProducts.fulfilled(mockProducts, "")
    );

    console.log("new:", newState);
    const length = mockProducts.products;
    expect(newState.status).toEqual("SUCCESS");
    expect(newState.products).toEqual(length);
    expect(newState.error).toEqual(null);
  });

  test("on rejected should set loading state to false and set error", async () => {
    // fetch products from server
    const newState = await reducerProducts(
      initialState,
      fetchAllProducts.rejected(
        { message: "Network request failed.", name: "error" },
        ""
      )
    );

    console.log("new:", newState);
    expect(newState.status).toEqual("ERROR");
    expect(newState.products.length).toEqual(0);
    expect(newState.error).not.toBeNull();
    expect(newState.error).toEqual({
      message: "Network request failed.",
      name: "error",
    });
  });
});
