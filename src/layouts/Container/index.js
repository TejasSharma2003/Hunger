import React, { useContext } from "react";
import "./index.scss";

import Cards from "../Cards";
import Loading from "../../components/Loading";

function Container() {
  return (
    <div className="container">
      <Cards />
    </div>
  );
}

export default Container;
