import React from "react";
import { Link } from "react-router-dom";
import style from "./Front.module.scss";
const Frontpage = () => {
  return (
    <div className={style.Front}>
      <h1>Welcome to MyPainter 0.2 Alpa</h1>
      <p>
        <Link to={`/VieweArtboard`}>Click here to se Artboards</Link>
      </p>
    </div>
  );
};

export default Frontpage;
