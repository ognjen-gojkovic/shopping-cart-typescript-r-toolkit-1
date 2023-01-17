import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/reduxStore";
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
