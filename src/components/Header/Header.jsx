import React from "react";
import { StoreContext } from "../../context/StoreContext";
import style from "./Header.module.scss";
import { observer } from "mobx-react";
// import UserLogin from "./UserLogin/UserLogin";
const Header = observer(() => {
  const { ArtboardSelection, setSelectArtboard } = React.useContext(StoreContext);
  return (
    <div className={style.Header}>
      <h3>Artboard : {ArtboardSelection}</h3>
      <span onClick={() => {
        setSelectArtboard(true)
      }} className={style.Board_button}>
        Go to Artboard
                </span>
    </div>
  );
});


export default Header;