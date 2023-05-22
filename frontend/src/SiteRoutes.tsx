import React from "react";
import { Route, Routes } from "react-router-dom";

import { WIPPage } from "./components";
import { Login, Register } from "./framework/Pages";
import { LINKS, Link } from "./settings";

function SiteRoutes(): JSX.Element {
  return (
    <Routes>
      {LINKS.map((item: Link) => (
        <Route key={item.text} path={item.to} element={item.page} />
      ))}
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route path="*" element={<WIPPage />} />
    </Routes>
  );
}

export default SiteRoutes;
