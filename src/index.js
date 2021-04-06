import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./Cart";
import setupMockServer from "./api/mock.server";
import { DataProvider } from "./Products";

setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
