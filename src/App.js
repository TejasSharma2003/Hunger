import { useContext, useEffect, useState } from "react";

import "./base.css";
import "./utils.css";

import Spinner from "./elements/Spinner";
import Header from "./components/Header";
import Container from "./layouts/Container";
import CartContext from "../src/hooks/CartContext";
import PopUp from "./components/PopUp";
import { Routes, Route } from "react-router-dom";
import RecipeView from "./pages/RecipeView";
import Loading from "./components/Loading";

function App() {
  const { isLoading, recipes } = useContext(CartContext);
  const [err, setError] = useState("");

  let content;

  if (recipes.length === 0 && !isLoading && !err) {
    content = (
      <p className="message">
        Search for the recipes to show up here ! <br /> Ex Pizza, Chicken, Beef, Pasta...
      </p>
    );
  } else if (!err && isLoading) {
    content = <Spinner />;
  } else if (err) {
    content = <p className="message">{err}</p>;
  } else {
    content = <Container />;
  }

  return (
    <>
      <h1 className="message-imp">
        Open on your fucking PC Dude <br /> ~ tejas
      </h1>
      <div className="App">
        <PopUp />
        <Header setError={setError} />
        <Routes>
          <Route path="/" element={content} />
          <Route path="/recipes" element={content} />
          <Route path="recipes/:id" element={<RecipeView />} />
          <Route
            path="*"
            element={
              <p className="message">ERROR 404 :( Contact The Developer</p>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
