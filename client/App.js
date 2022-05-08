import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./component/NavBar.js";
import MainCard from "./component/MainCard.js";
import MainContainer from "./component/MainContainer.js";

const App = (props) => {
  return (
    <>
        <Navbar />
        HELLO FROM APP COMPONENT
        <MainCard />
        <Link to="/likedCard">LikeCard</Link>
    </>
  );
};

export default App;
