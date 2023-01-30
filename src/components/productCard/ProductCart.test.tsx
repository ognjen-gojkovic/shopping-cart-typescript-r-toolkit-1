import { screen, waitFor, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderWithRedux";
import { mockProducts } from "../../utils/mockProducts";
import ProductCard from "./ProductCard";
import UserEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("should render component", () => {
  afterEach(cleanup);

  test("should correctly render image when button right is pressed", async () => {
    UserEvent.setup();
    jest.useFakeTimers();
    renderWithProviders(<ProductCard product={mockProducts.products[0]} />);

    const img1 = screen.getByRole("img");
    expect(img1.getAttribute("src")).toEqual(
      mockProducts.products[0].images[0]
    );

    const rightArrow = screen.getByTestId("right-arrow");
    UserEvent.click(rightArrow);
    act(() => {
      jest.runAllTimers();
    });
    const img2 = await screen.findByRole("img");

    await waitFor(() =>
      expect(img2.getAttribute("src")).toEqual(
        mockProducts.products[0].images[1]
      )
    );
    jest.useRealTimers();
  });

  test("should correctly render image when button left is pressed", async () => {
    UserEvent.setup();
    jest.useFakeTimers();
    renderWithProviders(<ProductCard product={mockProducts.products[0]} />);

    const img1 = screen.getByRole("img");
    expect(img1.getAttribute("src")).toEqual(
      mockProducts.products[0].images[0]
    );

    const leftArrow = screen.getByTestId("left-arrow");
    UserEvent.click(leftArrow);
    act(() => {
      jest.runAllTimers();
    });
    const img2 = await screen.findByRole("img");

    await waitFor(() =>
      expect(img2.getAttribute("src")).toEqual(
        mockProducts.products[0].images[
          mockProducts.products[0].images.length - 1
        ]
      )
    );
    jest.useRealTimers();
  });

  test("should correctly add item to cart", async () => {
    const { store } = renderWithProviders(
      <ProductCard product={mockProducts.products[0]} />
    );

    const addBtn = screen.getByRole("button", { name: "Add to Cart" });

    expect(addBtn).toBeInTheDocument();

    expect(store.getState().reducerCart.cart.length).toBe(0);

    await UserEvent.click(addBtn);
    expect(store.getState().reducerCart.cart.length).toBe(1);
  });
});
