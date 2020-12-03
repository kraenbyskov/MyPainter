import React from "react";
import { StoreContext } from "../../context/StoreContext";
import style from "./Header.module.scss";
// import UserLogin from "./UserLogin/UserLogin";
const Header = () => {
  const store = React.useContext(StoreContext);
  const ArtboardSelection = store.ArtboardSelection;
  return (
    <div className={style.Header}>
      <h3>Artboard : {ArtboardSelection}</h3>
    </div>
  );
};


export default Header;