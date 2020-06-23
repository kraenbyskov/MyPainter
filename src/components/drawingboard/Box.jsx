import React, { useState, useEffect } from "react";
import style from "./Drawingboard.module.scss";

const Box = (props) => {
  const [BackgroundColor, setBackgroundColor] = useState(props.BackgroundColor);
  const [PositionX, setPositionX] = useState(props.PositionX);
  const [PositionY, setPositionY] = useState(props.PositionY);
  const [MouseClick, setMouseClick] = useState(false);
  const [SizeH, setSizeH] = useState(props.SizeH);
  const [SizeW, setSizeW] = useState(props.SizeW);

  useEffect(() => {
    if (MouseClick) {
      setPositionX(props.X - SizeW / 2);
      setPositionY(props.Y - SizeH / 2);
    }
  }, [props, MouseClick, props.X, props.Y, SizeW, SizeH]);

  const mouseDown = () => {
    setMouseClick(true);
    // console.log("down");
  };

  const mouseUp = () => {
    setMouseClick(false);
    // console.log("up");
  };

  return (
    <div
      className={style.firstBox}
      onMouseDown={() => mouseDown()}
      onMouseUp={() => mouseUp()}
      style={{
        width: parseInt(SizeW),
        height: parseInt(SizeH),
        left: parseInt(PositionX),
        top: parseInt(PositionY),
        backgroundColor: BackgroundColor,
      }}
    >
      {/* <span />
      <span />
      <span />
      <span /> */}
    </div>
  );
};

export default Box;
