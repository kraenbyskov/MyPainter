import React, { useState, useEffect } from "react";
import style from "./EditLayers.module.scss";
import { firebase } from "../../global/Firebase/config";

const EditLayers = (props) => {
  const [Layers, setLayers] = useState(null);
  const [LayerName, setLayerName] = useState(null);
  const [BackgroundColor, setBackgroundColor] = useState(null);
  const [SizeW, setSizeW] = useState(null);
  const [SizeH, setSizeH] = useState(null);
  const [Position, setPosition] = useState(null);
  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages")
    .doc(props.Id);

  useEffect(() => {
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        setLayerName(board.LayerName);
        setBackgroundColor(board.BackgroundColor);
        setSizeW(board.SizeW);
        setSizeH(board.SizeH);
        setPosition({ X: board.PositionX, Y: board.PositionY });
      } else {
        console.log("No such document!");
      }
    });
    // eslint-disable-next-line
  }, [props.Id]);
  console.log(SizeW, SizeH);

  const onSubmit = () => {
    ref.set({
      LayerName,
      BackgroundColor,
      SizeW,
      SizeH,
      PositionX: Position.X,
      PositionY: Position.Y,
    });
  };

  console.log(Layers);
  return (
    <div className={style.EditLayers}>
      <h2>Edit Layer</h2>
      <label htmlFor="Name">Name </label>
      <input
        value={LayerName ? LayerName : "no value"}
        type="text"
        name="Name"
        onChange={(e) => setLayerName(e.target.value)}
      />

      <label htmlFor="background">Background Color</label>
      <input
        style={{
          backgroundColor: BackgroundColor ? BackgroundColor : "#FFFFFF",
        }}
        value={BackgroundColor ? BackgroundColor : "no value"}
        type="text"
        name="background"
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
      <label htmlFor="Width">Width Color</label>
      <input
        value={SizeW ? SizeW : "no value"}
        type="number"
        name="Width"
        onChange={(e) => setSizeW(e.target.value)}
      />

      <label htmlFor="Height">Height Color</label>
      <input
        value={SizeH ? SizeH : "no value"}
        type="number"
        name="Height"
        onChange={(e) => setSizeH(e.target.value)}
      />

      <div onClick={onSubmit} className={style.EditLayers_button}>
        Submit
      </div>
    </div>
  );
};

export default EditLayers;
