import React from "react";
import "./index.scss";
function Card(props) {
  return <div className="card">{props.children}</div>;
}

export default Card;
