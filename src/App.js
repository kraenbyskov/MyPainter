import React from "react";
import Router from "./global/Router/Router";
import { BrowserRouter } from "react-router-dom";
import "./global/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
