import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./global/App.scss";
import Artboard from "./pages/Artboard/Artboard";
import VieweArtboard from "./pages/VieweArtboard/VieweArtboard";

function App() {

  const [ArtboardSelection, setArtboardSelection] = useState(localStorage.getItem("ArtboardSelection"))

  console.log("🚀 ~ file: App.js ~ line 13 ~ App ~ ArtboardSelection", ArtboardSelection)
  useEffect(() => {
    localStorage.setItem("ArtboardSelection", ArtboardSelection);
    setArtboardSelection(localStorage.getItem("ArtboardSelection"))
  }, [ArtboardSelection])


  return (
    <div className="App">
      <VieweArtboard setArtboardSelection={setArtboardSelection} ArtboardSelection={ArtboardSelection} />
      <Artboard ArtboardSelection={ArtboardSelection} />


    </div>
  );
}

export default App;
