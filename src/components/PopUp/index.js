import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../hooks/CartContext";

import Cart from "../Cart";

import "./index.scss";

const Content = (props) => {
  const { cartIsVisible, hidePopup } = useContext(CartContext);

  const onClickHandler = () => {
    hidePopup();
  };

  return (
    <>
      <div
        className={`backdrop ${cartIsVisible && "backdrop--show"}`}
        onClick={onClickHandler}
      ></div>
      <Cart />
    </>
  );
};

function PopUp(props) {
  return ReactDOM.createPortal(<Content />, document.getElementById("popup"));
}

export default PopUp;
