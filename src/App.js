import React from "react";
import Routers from "./global/Router/Router";
import { BrowserRouter as Router } from "react-router-dom";
import "./global/App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routers />
      </Router>
    </div>
  );
}

export default App;
