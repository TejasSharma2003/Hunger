import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../hooks/CartContext";

import "./index.scss";

import Card from "../../ui/Card";

import Item from "../../components/Item";
import Button from "../../elements/Button";

import { AiOutlineArrowDown } from "react-icons/ai";

import axios from "axios";

function Cards() {
  let navigate = useNavigate();
  const { recipes, setIsLoading, addRecipe } = useContext(CartContext);
  const [docLimit, setDocLimit] = useState(20);

  let allowedRecipes = [];

  if (docLimit != 0) {
    allowedRecipes = recipes.slice(0, docLimit);
    // let i = 0;
    // while (i < docLimit) {
    //   allowedRecipes.push(recipes[i]);
    //   i++;
    // }
  } else {
    allowedRecipes = [...recipes];
  }

  const addToLocalStorage = (item) => {
    localStorage.setItem("recipe", JSON.stringify(item));
  };

  const onLoadRecipe = (e) => {
    e.preventDefault();
    localStorage.setItem("docLimit", JSON.stringify({ docLimit: 0 }));
    setDocLimit(0);
  };

  const onClickHandler = async (recipeId) => {
    try {
      setIsLoading(true);
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );

      const recipe = res.data.data.recipe;

      const modifiedRecipe = {
        id: recipe.id,
        publisher: recipe.publisher,
        ingredients: recipe.ingredients,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        title: recipe.title,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
      };

      addRecipe(modifiedRecipe);
      addToLocalStorage(modifiedRecipe);

      navigate(`/recipes/${recipeId}`);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="cards">
        {allowedRecipes.map((recipe) => {
          return (
            <Card key={recipe.id}>
              <Item
                onClick={onClickHandler}
                id={recipe.id}
                title={recipe.title}
                imageUrl={recipe.imageUrl}
                publisher={recipe.publisher}
                price={recipe.price}
                quantity={recipe.quantity}
              />
            </Card>
          );
        })}
      </div>
      {docLimit ? (
        <div className="cards__load-more">
          <Button class="btn--load-more" onClick={onLoadRecipe}>
            Load More <AiOutlineArrowDown className="cards__load-more-arrow" />
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Cards;
