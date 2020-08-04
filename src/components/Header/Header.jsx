import React from "react";
import style from "./Header.module.scss";

const Header = (props) => {
  return (
    <div className={style.Header}>
      <div>
        <h2>{props.ArtboardID}</h2>
        <p>This is a early Alpa of MyPainter</p>
      </div>
    </div>
  );
};

export default Header;
