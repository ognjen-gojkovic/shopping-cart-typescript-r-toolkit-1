import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderWithRedux";
import { mockProducts } from "../../utils/mockProducts";
import Home from "./Home";
import { reduxStore } from "../../redux/reduxStore";

const reducerProducts = {
  ...reduxStore.getState().reducerProducts,
  products: mockProducts.products,
};
describe("should render component", () => {
  afterEach(cleanup);
  test("should correctly render", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        reducerProducts: reducerProducts,
      },
    });

    const componentHeader = screen.getByText("Products");
    expect(componentHeader).toBeInTheDocument();

    const productCards = screen.queryAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });
});
