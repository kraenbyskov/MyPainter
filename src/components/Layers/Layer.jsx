import React from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";

const Layer = (props) => {
  let border = {
    border: "1px solid black",
  };

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

  const DeleteItem = () => {
    ref.doc(props.id).delete();
  };

  const FocusLayer = () => {
    props.Focus(props.id);
    border = {
      border: "1px solid red",
    };
  };

  return (
    <div onClick={FocusLayer} style={border} className={style.Layer}>
      {props.Name}
      <div className={style.Layer_Controls}>
        <span style={{ backgroundColor: props.Color }} />
        <span onClick={() => DeleteItem()}>-</span>
      </div>
    </div>
  );
};

export default Layer;
