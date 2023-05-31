import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { MainDashboard, AppDashboard, ModelDashboard } from "./framework/Admin";
import { Login, Register } from "./framework/Pages";
import { WIP } from "./components";
import { LINKS, LinkType } from "./config/links";

function SiteRoutes(): JSX.Element {
  const [count, setCount] = useState(null);

  return (
    <Routes>
      {LINKS.map((item: LinkType) => (
        <Route key={item.text} path={item.to} element={item.page} />
      ))}
      {/* Admin */}
      <Route key="admin" path="/admin" element={<MainDashboard />} />
      <Route path="/admin/model/:str" element={<AppDashboard />} />
      <Route
        path="/admin/:id"
        element={<ModelDashboard setCount={setCount} />}
      />

      {/* Tertiary */}
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route path="*" element={<WIP />} />
    </Routes>
  );
}

export default SiteRoutes;
