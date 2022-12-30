import React from "react";
import spinner from "../../assets/spinner.svg";
import "./index.css";

function Spinner() {
  return (
    <div className="lds-ellipsis spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  // return <img src={spinner} className="spinner"/>;
}

export default Spinner;
