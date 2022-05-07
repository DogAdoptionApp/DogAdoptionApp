import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./client/App.js";
import LikeCard from "./client/component/LikeCard";

createRoot(document.getElementById("app")).render(  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="likedCard" element={<LikeCard />} />
  </Routes>
</BrowserRouter>)