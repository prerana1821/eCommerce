import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./User";
import { DataProvider } from "./Products";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Auth";
// import setupMockServer from "./api/mock.server";

// setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
