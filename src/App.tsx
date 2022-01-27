import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./routes";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
