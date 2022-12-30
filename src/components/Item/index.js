import React, { useContext } from "react";
import Button from "../../elements/Button";
import "./index.scss";

import CartContext from "../../hooks/CartContext";

function Item(item) {
  const { addItem, selectedRecipes } = useContext(CartContext);

  const onClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
  };

  const onClickRecipe = () => {
    //Save item to local storage ..
    item.onClick(item.id);
  };

  return (
    <div onClick={onClickRecipe} className="item">
      <div className="item__img-container">
        <img className="item__img" src={item.imageUrl} alt={item.title} />
      </div>
      <div className="item__text-box">
        <h1 className="item__title">{item.title}</h1>
        <div className="item__description">
          <p className="item__caption">Publisher : {item.publisher}</p>
          <p className="item__caption">
            Price : <span className="item__pricing">${item.price}</span>
          </p>
          {/* <p className="item__caption">Cooking Time : 30mins </p> */}
        </div>
        <Button onClick={onClickHandler} class="btn--card">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default Item;
