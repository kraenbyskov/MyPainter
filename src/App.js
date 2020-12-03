import React from "react";

import { StoreProvider } from "./context/StoreContext";
import "./global/App.scss";
import Artboard from "./pages/Artboard/Artboard";
import VieweArtboard from "./pages/VieweArtboard/VieweArtboard";

function App() {

  return (
    <div className="App">
      <StoreProvider>
        <VieweArtboard />
        <Artboard />
      </StoreProvider>
    </div>
  );
}

export default App;
