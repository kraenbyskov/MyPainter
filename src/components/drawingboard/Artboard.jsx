import React from "react";
import style from "./Drawingboard.module.scss";

const Artboard = (props) => {
  return <div className={style.Artboard}> {props.children}</div>;
};

export default Artboard;
