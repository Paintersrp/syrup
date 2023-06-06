import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AppDashboard,
  Login,
  MainDashboard,
  ModelDashboard,
  NotFound,
  ObjectDashboard,
  Register,
} from "./framework";
import { About, Contact, Landing, WIP } from "./components";
import Jobs from "./components/Jobs/Jobs";

function AppRoutes(): JSX.Element {
  const [count, setCount] = useState<any>();

  return (
    <Routes>
      {/* Page Links */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/WIP" element={<WIP />} />

      {/* Admin Links */}
      <Route path="/admin" element={<MainDashboard />} />
      <Route path="/admin/model/:str" element={<AppDashboard />} />
      <Route
        path="/admin/:id"
        element={<ModelDashboard setCount={setCount} />}
      />
      <Route path="/admin/:str/control" element={<ObjectDashboard />} />
      <Route path="/admin/:str/control/:pk" element={<ObjectDashboard />} />

      {/* Tertiary Links */}
      <Route path="/jobposting/:id" element={<Jobs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
