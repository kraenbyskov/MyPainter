import React from "react";
import style from "./VieweArtboard.module.scss";

const Board = (props) => {
  return <div className={style.Board}>{props.children}</div>;
};

export default Board;
