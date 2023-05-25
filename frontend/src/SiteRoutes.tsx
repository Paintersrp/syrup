import React from "react";
import { Route, Routes } from "react-router-dom";

import { WIPPage } from "./components";
import { MainDashboard, AppDashboard } from "./framework/Admin";
import { Login, Register } from "./framework/Pages";
import { LINKS } from "./config";
import { Link } from "./config/links";

function SiteRoutes(): JSX.Element {
  return (
    <Routes>
      {LINKS.map((item: Link) => (
        <Route key={item.text} path={item.to} element={item.page} />
      ))}
      <Route key="admin" path="/admin" element={<MainDashboard />} />
      <Route path="/admin/model/:str" element={<AppDashboard />} />
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route path="*" element={<WIPPage />} />
    </Routes>
  );
}

export default SiteRoutes;
