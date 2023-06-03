import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { store } from "./lib";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
