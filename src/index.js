import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./CartProvider";
import setupMockServer from "./api/mock.server";
import { DataProvider } from "./DataProvider";

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
