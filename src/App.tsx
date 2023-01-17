import React from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/reduxHooks";
import { fetchAllProducts } from "./redux/actions/Actions.Products";
import styled from "styled-components";
import { GlobalStyle } from "./utils/GlobalStyle";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [showCart, setShowCart] = React.useState<boolean>(false);
  const cart = useAppSelector((state) => state.reducerCart);

  React.useEffect(() => {
    dispatch(fetchAllProducts());

    if (cart.cart.length > 0)
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [dispatch, cart]);

  const handleCartToggle = (from?: string): void => {
    if (from === "navbar") setShowCart(true);
    else setShowCart(false);
  };

  return (
    <AppStyled className="App">
      <GlobalStyle />
      <Navbar handleCartToggle={handleCartToggle} />
      <Cart toggle={showCart} handleToggleCart={handleCartToggle} />
      <Home />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00c3ff, #3a5eff);
`;

export default App;
