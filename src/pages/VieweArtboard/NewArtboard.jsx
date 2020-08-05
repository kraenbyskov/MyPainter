import React, { useState } from "react";
import style from "./VieweArtboard.module.scss";
import { firebase } from "../../global/Firebase/config";

const NewArtboard = (props) => {
  const [Data, setData] = useState("");

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSubmit = (event) => {
    const ref = firebase.firestore().collection("Artboard");

    ref.doc(Data).set({
      ArtboardName: Data,
      BackgroundColor: "#FFFFFF",
      Heught: 500,
      Width: 500,
      Users: ["hans"],
      LayerOrder: [0, 1],
    });

    ref.doc(Data).collection("Layers").doc().set({
      BackgroundColor: "#FF0000",
      LayerName: "New Layer",
      PositionX: 250,
      PositionY: 250,
      SizeH: 100,
      SizeW: 100,
      zIndex: 1,
    });

    event.preventDefault();
  };
  return (
    <div className={style.NewArtboard}>
      <p>New Artboard</p>
      <form onSubmit={handleSubmit}>
        <label>
          Artboard Name:
          <input type="text" value={Data} onChange={handleChange} />
        </label>
        <input className={style.submitButton} type="submit" value="Add" />
      </form>
      <p className={style.button} onClick={() => props.isOpen(false)}>
        X
      </p>
    </div>
  );
};

export default NewArtboard;
