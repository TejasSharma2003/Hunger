import React from "react";
import "./index.scss";

import { BsCheckAll } from "react-icons/bs";

function Ingredient(props) {
  return (
    <li className="recipe__ingredient">
      {/* <BsCheckAll className="recipe__icon--check" /> */}
      <span className="recipe__description">{props.description}</span>
    </li>
  );
}

export default Ingredient;
