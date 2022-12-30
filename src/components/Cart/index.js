import React, { useContext } from "react";
import "./index.scss";

import CartItems from "./CartItems";
import CartContext from "../../hooks/CartContext";

import { RxCross1 } from "react-icons/rx";
import { AiOutlineSmile } from "react-icons/ai";

function Cart() {
  const { selectedRecipes, cartIsVisible, hidePopup } = useContext(CartContext);

  const onHidePopup = () => {
    hidePopup();
  };

  let price = 0;

  price = selectedRecipes.reduce(
    (acc, recipe) => recipe.price * recipe.quantity + acc,
    0
  );
  let content;
  if (selectedRecipes.length <= 0) {
    content = <p className="caption-add-stuff">No Stuff! Add Some Stuff To Your Cart.</p>;
  } else {
    content = selectedRecipes.map((recipe) => {
      return (
        <CartItems
          key={recipe.id}
          id={recipe.id}
          imageUrl={recipe.imageUrl}
          title={recipe.title}
          price={recipe.price}
          publisher={recipe.publisher}
          quantity={recipe.quantity}
        />
      );
    });
  }

  return (
    <>
      <div className={`cart ${cartIsVisible && "cart--show"}`}>
        <h1 className="cart__title">My Cart</h1>
        <span onClick={onHidePopup} className="cart__close">
          <RxCross1 />
        </span>

        <div className="cart__items">{content}</div>
        <div className="cart__pricing">
          <h2 className="cart__total">Total</h2>
          <span className="cart__money">${price}</span>
        </div>
      </div>
    </>
  );
}

export default Cart;
