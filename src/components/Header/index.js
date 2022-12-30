import React, { useState, useContext, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./index.scss";
import Button from "../../elements/Button";
import Line from "../../elements/Line";
import CartContext from "../../hooks/CartContext";

import { CiSearch } from "react-icons/ci";
import axios from "axios";

function Header(props) {
  let navigate = useNavigate();
  const [keyWord, setkeyWord] = useState("");
  const { recipes, setRecipes, selectedRecipes, setIsLoading, showPopup } =
    useContext(CartContext);
  const [isPulse, setIsPulse] = useState(false);

  useEffect(() => {
    setIsPulse(true);

    const timer = setTimeout(() => {
      setIsPulse(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedRecipes]);

  const onShowPopup = (e) => {
    e.preventDefault();
    showPopup();
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setkeyWord(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (keyWord.trim() === "") return;
    try {
      navigate("/");
      setIsLoading(true);
      props.setError("");
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyWord}`
      );

      if (res.data.data.recipes.length === 0) {
        throw new Error(`No Recipes were found for ${keyWord} !`);
      }
      const modifiedRecipes = res.data.data.recipes.map((recipe) => {
        return {
          id: recipe.id,
          imageUrl: recipe.image_url,
          publisher: recipe.publisher,
          title: recipe.title,
          quantity: 1,
          price: Math.floor(Math.random() * 1000 + 100),
        };
      });

      setRecipes(modifiedRecipes);
      navigate("/recipes");
    } catch (err) {
      props.setError(err.message);
    }

    setIsLoading(false);
  };

  let numberofRecipes = selectedRecipes.length;

  return (
    <div className={`header`}>
      <div className="header__container">
        <h1 className="header__logo">HUNGER</h1>
        <form className="header__drop-text-area" onSubmit={onSubmitHandler}>
          {/* <div className={`header__arrow ${isUp && "header__arrow-up"}`}>
            <select className="header__dropdown" onClick={onClickHandler}>
              <option value="api">From Hunger</option>
              <option value="Owner">Owner</option>
            </select>
          </div>
          <Line /> */}
          <input
            type="text"
            placeholder="Search for the recipes you wanna know about."
            className="header__input"
            onChange={onChangeHandler}
            value={keyWord}
          />
          <button className="header__submit-btn">
            <CiSearch />
            <span>Submit</span>
          </button>
        </form>

        <Button
          onClick={onShowPopup}
          class={`btn--header ${isPulse && "btn--pulse"}`}
        >
          Your Cart <span>({numberofRecipes})</span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
