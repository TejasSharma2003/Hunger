import React, { useContext } from "react";
import "./index.scss";

import CartContext from "../../../hooks/CartContext";

import { IoIosAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

function CartItems(props) {
  const { increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);

  const onClickIncrease = () => {
    increaseQuantity(props.id, props.quantity);
  };

  const onClickDecrease = () => {
    decreaseQuantity(props.id, props.quantity);
  };

  const onRemove = () => {
    removeItem(props.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item__container">
        <div className="cart-item__col cart-item__col--1">
          <img src={props.imageUrl} className="cart-item__img" />
        </div>
        <div className="cart-item__col--2">
          <div className="cart-item__row cart-item__row--1">
            <h2>{props.title}</h2>
            <span >${props.price}</span>
          </div>

          <div className="cart-item__row cart-item__row--2">
            <p>Publisher : {props.publisher}</p>
          </div>

          <div className="cart-item__row cart-item__row--3">
            <div className="cart-item__q-handler cart-item__row">
              <span onClick={onClickIncrease} className="cart-item__icon-box">
                <IoIosAdd className="cart-item__icon cart-item__icon-add " />
              </span>
              <span className="cart-item__quantity">{props.quantity}</span>
              <span onClick={onClickDecrease} className="cart-item__icon-box">
                <GrFormSubtract className="cart-item__icon cart-item__icon-sub" />
              </span>
            </div>
            <span onClick={onRemove}className="cart-item__icon-box">
              <AiOutlineDelete className="cart-item__icon cart-item__icon-delete" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
