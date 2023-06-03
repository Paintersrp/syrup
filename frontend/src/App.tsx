import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import {
  AppDrawer,
  AppFooter,
  AppNavbar,
  ScrollToTopFAB,
} from "./framework/Prebuilt";

import { closeSnackbar } from "./lib";
import { ScrollToTop, WithAuth } from "./utils";
import { LINKS, LOGO, TITLE } from "./settings";
import { Alert, useDrawer } from "./framework/Base";
import AppRoutes from "./AppRoutes";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.snackbar);
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <Router>
      {alert.open && (
        <Alert
          alert={{ message: alert.message, type: alert.type }}
          onClose={() => dispatch(closeSnackbar())}
        />
      )}
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
      <AppRoutes />
      <AppFooter />
      <ScrollToTop />
      <ScrollToTopFAB />
    </Router>
  );
}

export default WithAuth(App);
