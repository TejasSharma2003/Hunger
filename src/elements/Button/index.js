import React from "react";

import "./index.scss";

function CartButton(props) {
  return (
    <a onClick={props.onClick} href="#" className={`btn ${props.class}`}>
      {props.children}
    </a>
  );
}

export default CartButton;
