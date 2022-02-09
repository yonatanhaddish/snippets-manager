import React from "react";
import Router from "./Router";
import "../src/style/index.scss";
import Axios from "axios";
import { UserContextProvider } from "./context/UserContext";

Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
