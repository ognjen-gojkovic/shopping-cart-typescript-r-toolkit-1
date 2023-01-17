import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/reduxHooks";
import { CartStyled } from "./Styled.Cart";
import {
  updateQuantity,
  removeItem,
  submit,
} from "../../redux/reducers/Reducer.Cart";

type Props = {
  toggle: boolean;
  handleToggleCart: () => void;
};

const Cart: React.FC<Props> = ({ toggle, handleToggleCart }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.reducerCart);

  return (
    <CartStyled toggle={toggle}>
      <div onClick={() => handleToggleCart()} className="modal"></div>
      <div className="cart">
        <h2>Your Items</h2>
        {cart.cart.length < 1 ? (
          <h2>Cart is empty.</h2>
        ) : (
          <>
            <div className="items">
              {cart.cart.map((item) => {
                return (
                  <div key={item.id} className="item">
                    <div className="head">
                      <h3>{item.title}</h3>
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="update">
                      <button
                        className="btn-opr"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, opt: "plus" }))
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn-opr"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id }))
                        }
                      >
                        -
                      </button>
                    </div>
                    <div className="show">
                      <div className="quantity">Qunatity: {item.qty}</div>
                      <div className="total">
                        Price: {item.price * item.qty}
                      </div>
                    </div>
                    <div
                      onClick={() => dispatch(removeItem(item.id))}
                      className="delete"
                    >
                      X
                    </div>
                  </div>
                );
              })}
              <div className="container">Total: $ {cart.totalPrice}</div>
            </div>
            <div className="btn">
              <button
                onClick={() => {
                  alert("Your purchase is complete!\nCongradulation!!1");
                  handleToggleCart();
                  dispatch(submit());
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </CartStyled>
  );
};

export default Cart;
