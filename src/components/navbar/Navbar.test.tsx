import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { reduxStore } from "../../redux/reduxStore";
import Navbar from "./Navbar";

describe("Navbar test", () => {
  test("should correctly render Navbar component", async () => {
    const mockFn = jest.fn();
    render(
      <Provider store={reduxStore}>
        <Navbar handleCartToggle={mockFn} />
      </Provider>
    );

    const header = screen.getByText("Shopping cart app");
    const total = await screen.findByText(/total/i);
    const cart = screen.getByTestId("cart");

    await UserEvent.click(cart);

    expect(header).toHaveTextContent("Shopping cart app");
    expect(total).toHaveTextContent("Total: $0");
    expect(mockFn).toBeCalled();
  });
});
