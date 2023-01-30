import React from "react";
import { useAppSelector } from "../../redux/hooks/reduxHooks";
import { NavbarStyled } from "./Styled.Navbar";

export type Props = {
  handleCartToggle: (from?: string) => void;
};

const Navbar: React.FC<Props> = ({ handleCartToggle }) => {
  const totalPrice = useAppSelector((state) => state.reducerCart.totalPrice);

  return (
    <NavbarStyled>
      <h2>Shopping cart app</h2>
      <div className="container">
        <span>Total: ${totalPrice}</span>
        <div
          className="cart"
          data-testid="cart"
          onClick={() => handleCartToggle("navbar")}
        >
          <i></i> Cart
        </div>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
