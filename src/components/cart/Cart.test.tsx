import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderWithRedux";
import { mockProducts } from "../../utils/mockProducts";
import Cart from "./Cart";
import UserEvent from "@testing-library/user-event";
import { reduxStore } from "../../redux/reduxStore";

const cartProducts = [
  { ...mockProducts.products[0], qty: 1 },
  { ...mockProducts.products[1], qty: 1 },
];

const handleMock = jest.fn();

const myMock = jest.fn();
myMock.mockReturnValue(true).mockReturnValue(false);
describe("cart component", () => {
  afterEach(cleanup);

  test("should render empty cart component", () => {
    renderWithProviders(<Cart toggle={true} handleToggleCart={handleMock} />);

    const header = screen.getByText("Your Items");
    const emptyCart = screen.getByText("Cart is empty.");
    expect(header).toBeInTheDocument();
    expect(emptyCart).toBeInTheDocument();
  });

  test("should render cart with two items in it", async () => {
    const totalPrice = mockProducts.products.reduce((prev, item) => {
      return item.price + prev;
    }, 0);

    renderWithProviders(<Cart toggle={true} handleToggleCart={handleMock} />, {
      preloadedState: {
        ...reduxStore.getState(),
        reducerCart: {
          ...reduxStore.getState().reducerCart,
          cart: cartProducts,
          totalPrice: totalPrice,
        },
      },
    });

    const tPrice = screen.getByText(/total:/i);
    expect(tPrice.textContent).toEqual(`Total: $${totalPrice}`);

    const prices = screen.queryAllByText(/price:/i);
    expect(prices.length).toBe(2);
  });

  test("should properly update product quantity in cart, increment by 1, and decrement also by 1", async () => {
    renderWithProviders(<Cart toggle={true} handleToggleCart={handleMock} />, {
      preloadedState: {
        ...reduxStore.getState(),
        reducerCart: {
          ...reduxStore.getState().reducerCart,
          cart: [cartProducts[0]],
        },
      },
    });

    const addQuantity = screen.getByText("+");
    expect(addQuantity).toBeInTheDocument();

    const productQuantity = screen.getByText(/quantity:/i);
    expect(productQuantity).toBeInTheDocument();

    await UserEvent.click(addQuantity);
    await UserEvent.click(addQuantity);
    expect(productQuantity.textContent).toEqual("Quantity: 3");

    const deduceQuantity = screen.getByText("-");
    expect(deduceQuantity).toBeInTheDocument();

    await UserEvent.click(deduceQuantity);
    expect(productQuantity.textContent).toEqual("Quantity: 2");
  });

  test("should properly remove item from cart", async () => {
    renderWithProviders(<Cart toggle={true} handleToggleCart={handleMock} />, {
      preloadedState: {
        ...reduxStore.getState(),
        reducerCart: {
          ...reduxStore.getState().reducerCart,
          cart: cartProducts,
        },
      },
    });

    const rmvBtn = screen.getAllByText("X");
    expect(rmvBtn).toHaveLength(2);

    await UserEvent.click(rmvBtn[0]);

    const newRmvBtn = screen.getAllByText("X");
    expect(newRmvBtn).toHaveLength(1);
  });

  test("should properly submit and toggle cart", async () => {
    const mockFn = jest.fn();

    renderWithProviders(<Cart toggle={true} handleToggleCart={mockFn} />, {
      preloadedState: {
        ...reduxStore.getState(),
        reducerCart: {
          ...reduxStore.getState().reducerCart,
          cart: cartProducts,
        },
      },
    });

    const submit = screen.getByText("Proceed to Payment");
    const testID = screen.getByTestId("cart-component");

    expect(submit).toBeInTheDocument();
    expect(testID).toHaveStyle("opacity: 1");

    await UserEvent.click(submit);
    const emptyCart = screen.getByText("Cart is empty.");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(emptyCart).toBeInTheDocument();
  });

  test("should properly toggle cart when modal is pressed", async () => {
    const mockFn = jest.fn();

    renderWithProviders(<Cart toggle={true} handleToggleCart={mockFn} />, {
      preloadedState: {
        ...reduxStore.getState(),
        reducerCart: {
          ...reduxStore.getState().reducerCart,
          cart: cartProducts,
        },
      },
    });

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    await UserEvent.click(modal);

    expect(mockFn).toBeCalledTimes(1);
  });
});
