import { screen, cleanup } from "@testing-library/react";
import App from "./App";
import UserEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils/renderWithRedux";

describe("App component", () => {
  afterEach(cleanup);
  test("should correctly render app tree", () => {
    const { container } = renderWithProviders(<App />);

    expect(container).toMatchSnapshot();
  });

  test("should correctly change cart show state", async () => {
    renderWithProviders(<App />);

    const cart = screen.getByTestId("cart-component");
    expect(cart).toHaveStyle("opacity: 0");

    const btn = screen.getByTestId("cart");
    await UserEvent.click(btn);

    expect(cart).toHaveStyle("opacity: 1");
  });
});
