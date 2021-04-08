import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Cart";
import setupMockServer from "./api/mock.server";
import { DataProvider } from "./Products";
import { BrowserRouter as Router } from "react-router-dom";

setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
