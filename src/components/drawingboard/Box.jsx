import React, { useState, useEffect } from "react";
import style from "./Drawingboard.module.scss";
import { firebase } from "../../global/Firebase/config";

const Box = (props) => {
  const [PositionX, setPositionX] = useState(props.PositionX);
  const [PositionY, setPositionY] = useState(props.PositionY);
  const [MouseClick, setMouseClick] = useState(false);

  const ref = firebase
    .firestore()
    .collection("Artboard")
    .doc(props.ArtboardID)
    .collection("Layers")
    .doc(props.Id);

  useEffect(() => {
    if (MouseClick) {
      setPositionX(props.X - props.SizeW / 2);
      setPositionY(props.Y - props.SizeH / 2);
    }
  }, [MouseClick, props]);

  const mouseDown = () => {
    setMouseClick(true);
    // console.log("down");
  };

  const mouseUp = () => {
    setMouseClick(false);
    // console.log("up");
    ref.update({
      PositionX: PositionX,
      PositionY: PositionY,
    });
  };

  const FocusLayer = () => {
    props.Focus(props.Id);
  };

  return (
    <div
      onClick={FocusLayer}
      className={style.firstBox}
      onMouseDown={() => mouseDown()}
      onMouseUp={() => mouseUp()}
      style={{
        width: parseInt(props.SizeW),
        height: parseInt(props.SizeH),
        left: parseInt(PositionX),
        top: parseInt(PositionY),
        backgroundColor: props.BackgroundColor,
        zIndex: props.zIndex,
      }}
    ></div>
  );
};

export default Box;
