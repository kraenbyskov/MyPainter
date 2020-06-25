import React from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";
import Layer from "./Layer";

const Layers = (props) => {
  let sorted = null;
  if (props) {
    sorted = props.Data.sort((a, b) => b["zIndex"] - a["zIndex"]);
  }

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

  const AddLayer = () => {
    ref.doc().set({
      BackgroundColor: "#FF0000",
      LayerName: "New Layer",
      PositionX: 250,
      PositionY: 250,
      SizeH: 100,
      SizeW: 100,
      zIndex: 1,
    });
  };

  return (
    <div className={style.Layers}>
      <div className={style.Layers_Container}>
        {sorted
          ? sorted.map((Data) => (
              <Layer Focus={props.GetLayerId} key={Data.id} Data={Data} />
            ))
          : null}
      </div>
      <div className={style.Layers_Add}>
        <p>Add Layer</p>
        <span onClick={() => AddLayer()}>
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default Layers;
