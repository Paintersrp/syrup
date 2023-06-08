import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AppDashboard,
  ApplicationView,
  Login,
  MainDashboard,
  MessageView,
  ModelDashboard,
  NotFound,
  ObjectDashboard,
  Register,
} from "./framework";
import { About, Contact, Jobs, Landing, Post, Posts, WIP } from "./components";

function AppRoutes(): JSX.Element {
  const [count, setCount] = useState<any>();

  return (
    <Routes>
      {/* Page Routes */}
      <Route path="" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/jobposting/:id" element={<Jobs />} />

      <Route path="/WIP" element={<WIP />} />

      {/* Posts Routes */}
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<Post />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<MainDashboard />} />
      <Route
        path="/admin/:id"
        element={<ModelDashboard setCount={setCount} />}
      />
      <Route path="/admin/model/:str" element={<AppDashboard />} />
      <Route path="/admin/:str/control" element={<ObjectDashboard />} />
      <Route path="/admin/:str/control/:pk" element={<ObjectDashboard />} />

      {/* Admin View Routes */}
      <Route
        path="/admin/messages/read"
        element={<MessageView setCount={setCount} />}
      />
      <Route
        path="/admin/messages/read/:pk"
        element={<MessageView setCount={setCount} />}
      />
      <Route path="/admin/application/read" element={<ApplicationView />} />
      <Route path="/admin/application/read/:pk" element={<ApplicationView />} />

      {/* Tertiary Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
