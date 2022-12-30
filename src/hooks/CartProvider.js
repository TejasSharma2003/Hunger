import { useState, useReducer } from "react";
import CartContext from "./CartContext";

const intialState = [];

const addToLocalStorage = (items) => {
  localStorage.setItem("selectedRecipes", JSON.stringify(items));
};

const filterStr = (str, filterValue) => {
  let newStr = str;
  if (newStr.length > filterValue) {
    newStr = str.slice(0, filterValue);
    newStr = newStr.padEnd(newStr.length + 3, "...");
  }
  return newStr;
};

const alterQuantity = (currRecipes, itemId, action) => {
  const targettedRecipeIndex = currRecipes.findIndex(
    (item) => item.id === itemId
  );

  const targettedRecipe = currRecipes[targettedRecipeIndex];
  let updatedRecipe;

  if (action === "INCREASE_QUANTITY") {
    updatedRecipe = {
      ...targettedRecipe,
      quantity: targettedRecipe.quantity + 1,
    };
  } else if (action === "DECREASE_QUANTITY") {
    updatedRecipe = {
      ...targettedRecipe,
      quantity:
        targettedRecipe.quantity <= 1 ? 1 : targettedRecipe.quantity - 1,
    };
  }

  const updatedRecipes = [...currRecipes];
  updatedRecipes[targettedRecipeIndex] = updatedRecipe;

  return updatedRecipes;
};

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //add item to selected cart...
    const filterTitle = filterStr(action.item.title, 20);

    const exististingItemIndex = state.findIndex(
      (item) => item.id === action.item.id
    );
    const exististingItem = state[exististingItemIndex];

    if (exististingItem) {
      //items already exist in the cart
      let updatedItems;

      let updatedItem = {
        ...exististingItem,
        quantity: exististingItem.quantity + 1,
      };

      updatedItems = [...state];

      updatedItems[exististingItemIndex] = updatedItem;

      return updatedItems;
    }

    const newItem = {
      id: action.item.id,
      title: filterTitle,
      imageUrl: action.item.imageUrl,
      price: action.item.price,
      quantity: action.item.quantity || 1,
      publisher: action.item.publisher,
    };

    return [...state, newItem];
  } else if (action.type === "INCREASE_QUANTITY") {
    return alterQuantity(state, action.itemId, action.type);
  } else if (action.type === "DECREASE_QUANTITY") {
    const targettedRecipe = state.find((item) => item.id === action.itemId);
    if (targettedRecipe.quantity === 1) return state;

    return alterQuantity(state, action.itemId, action.type);
  } else if (action.type === "REMOVE") {
    const currRecipes = [...state];
    const filtedRecipes = currRecipes.filter(
      (recipe) => recipe.id !== action.itemId
    );

    return filtedRecipes;
  }
};

const CartProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("selectedRecipes")) || intialState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(
    JSON.parse(localStorage.getItem("recipe")) || null
  );
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const hidePopup = () => {
    setCartIsVisible(false);
  };

  const showPopup = () => {
    setCartIsVisible(true);
  };

  const addRecipe = (recipe) => {
    setRecipe(recipe);
  };

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const increaseQuantity = (itemId, currQuantity) => {
    dispatch({ type: "INCREASE_QUANTITY", itemId, currQuantity });
  };

  const decreaseQuantity = (itemId, currQuantity) => {
    dispatch({ type: "DECREASE_QUANTITY", itemId, currQuantity });
  };

  const removeItem = (itemId) => {
    dispatch({ type: "REMOVE", itemId });
  };

  return (
    <CartContext.Provider
      value={{
        recipes,
        setRecipes,
        selectedRecipes,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        isLoading,
        setIsLoading,
        addRecipe,
        recipe,
        cartIsVisible,
        hidePopup,
        showPopup,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
