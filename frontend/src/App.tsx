import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import {
  Alert,
  AppDrawer,
  AppFooter,
  AppNavbar,
  ScrollToTopFAB,
  useDrawer,
} from "./framework";
import { closeSnackbar } from "./lib";
import { ScrollToTop, WithAuth } from "./utils";
import { LINKS, LOGO, TITLE } from "./settings";
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

      <ScrollToTop />
      <ScrollToTopFAB />
      <AppFooter />
    </Router>
  );
}

export default WithAuth(App);
