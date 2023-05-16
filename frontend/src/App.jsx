import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import Drawer from "./framework/Prebuilt/Drawer/Drawer";
import Navbar from "./framework/Prebuilt/Navbar/Navbar";
import Footer from "./framework/Prebuilt/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import SiteRoutes from "./SiteRoutes";

import { LOGO, TITLE, LINKS } from "./settings";
import { useDrawer } from "./framework/Prebuilt/Drawer/hooks/useDrawer";
import withAuth from "./lib/Auth/withAuth/withAuth";

function App() {
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <Router>
      <ScrollToTop />
      <Navbar
        menuButton
        menuOpen={isDrawerOpen}
        menuOnClick={handleDrawer}
        links={LINKS}
      />
      <Drawer
        open={isDrawerOpen}
        handleClose={handleDrawer}
        companyIcon={LOGO}
        companyTitle={TITLE}
      />
      <SiteRoutes />
      <Footer />
    </Router>
  );
}

export default withAuth(App);
