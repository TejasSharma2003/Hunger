import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

import { BiTimeFive } from "react-icons/bi";
import { MdOutlinePeople } from "react-icons/md";

import Ingredient from "../../components/Ingredient";

import CartContext from "../../hooks/CartContext";

import Button from "../../elements/Button";

function RecipeView() {
  const navigate = useNavigate();
  const { recipe, addItem, recipes } = useContext(CartContext);

  const getPrice = (itemId) => {
    const item = recipes.findIndex((item) => item.id === itemId);
    return recipes[item].price;
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const modifiedRecipe = { ...recipe };
    modifiedRecipe.price = getPrice(recipe.id);
    addItem(modifiedRecipe);
  };

  const onGetDirection = (e) => {
    e.preventDefault();
    navigate("/direction");
  };

  return (
    <section className="recipe">
      <div className="recipe__container">
        <img src={recipe.imageUrl} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </div>
      <div className="recipe__row">
        <div className="recipe__col recipe__col--1">
          <div className="recipe__sub-col">
            <BiTimeFive className="recipe__icon" />
            <span className="caption--bold util-mg-right-tiny">
              {recipe.cookingTime}
            </span>
            <span className="caption">Minutes</span>
          </div>
          <div className="recipe__sub-col">
            <MdOutlinePeople className="recipe__icon" />
            <span className="caption--bold util-mg-right-tiny">
              {recipe.servings}
            </span>
            <span className="caption">Servings</span>
          </div>
        </div>
        <div className="recipe__col recipe__coll--2">
          <Button onClick={onClickHandler} class="btn--card">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="recipe__ingredients-container">
        <h1 className="heading">Recipe Incredients</h1>
        <div className="flex-container">
          <ul className="recipe__ingredients">
            {recipe.ingredients.map((item, id) => {
              return (
                <Ingredient
                  key={id}
                  description={item.description}
                  unit={item.unit}
                  quantity={item.quantity}
                />
              );
            })}
          </ul>
        </div>
      </div>

      <div className="recipe__guide">
        <h1 className="heading">How to cook it</h1>
        <p className="caption">
          This recipe was carefully designed and tested by{" "}
          <span className="caption-bold">{recipe.publisher}</span>
          <br />
          Please check out directions at their website.
        </p>
        <Button onClick={onGetDirection} class="recipe__guide-btn">
          Direction
        </Button>
      </div>
    </section>
  );
}

export default RecipeView;
