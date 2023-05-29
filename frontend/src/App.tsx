import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import SiteRoutes from "./SiteRoutes";

import { useDrawer } from "./framework/Base/Drawer/hooks/useDrawer";
import {
  AppDrawer,
  AppFooter,
  AppNavbar,
  ScrollToTopFAB,
} from "./framework/Prebuilt";
import { ScrollToTop, WithAuth } from "./utils";
import { LINKS, LOGO, TITLE } from "./config";

function App(): JSX.Element {
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <Router>
      <ScrollToTop />
      <ScrollToTopFAB />
      <AppNavbar
        menuButton
        menuOpen={isDrawerOpen}
        menuOnClick={handleDrawer}
        links={LINKS}
      />
      <AppDrawer
        open={isDrawerOpen}
        handleClose={handleDrawer}
        companyIcon={LOGO}
        companyTitle={TITLE}
      />
      <SiteRoutes />
      <AppFooter />
    </Router>
  );
}

export default WithAuth(App);
