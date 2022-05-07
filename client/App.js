import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from './component/NavBar.js'

const App = (props) => {

  return (
    <>
    <Navbar />
    HELLO FROM APP COMPONENT
    <Link to="/likedCard">LikeCard</Link>

    </>
  );
};

export default App;
