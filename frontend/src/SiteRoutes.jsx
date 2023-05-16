import React from "react";
import { Route, Routes } from "react-router-dom";
import WIPPage from "./components/WIP/WIPPage";
import Login from "./framework/Pages/Login/Login";
import Register from "./framework/Pages/Register/Register";
import { LINKS } from "./settings";

function SiteRoutes() {
  return (
    <Routes>
      {LINKS.map((item) => (
        <Route key={item.text} path={item.to} element={item.page} />
      ))}
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route path="*" element={<WIPPage />} />
    </Routes>
  );
}

export default SiteRoutes;
