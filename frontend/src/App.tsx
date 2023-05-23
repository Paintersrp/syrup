import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import SiteRoutes from "./SiteRoutes";
import ScrollToTop from "./utils/ScrollToTop";

import { AppDrawer, AppFooter, AppNavbar } from "./framework/Prebuilt";
import { LOGO, TITLE, LINKS } from "./settings";
import { useDrawer } from "./framework/Base/Drawer/hooks/useDrawer";
import withAuth from "./lib/Auth/withAuth/withAuth";

function App(): JSX.Element {
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <Router>
      <ScrollToTop />
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

export default withAuth(App);
