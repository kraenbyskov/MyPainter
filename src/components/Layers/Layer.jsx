import React from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";

const Layer = (props) => {
  let border = {
    border: "1px solid black",
  };

  console.log(props);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages")
    .doc(props.Data.id);

  const DeleteItem = () => {
    ref.doc(props.Data.id).delete();
  };

  const FocusLayer = () => {
    props.Focus(props.Data.id);
    border = {
      border: "1px solid red",
    };
  };

  const MoveLayerUp = () => {
    ref.set({
      LayerName: props.Data.LayerName,
      BackgroundColor: props.Data.BackgroundColor,
      SizeW: props.Data.SizeW,
      SizeH: props.Data.SizeH,
      PositionX: props.Data.PositionX,
      PositionY: props.Data.PositionY,
      zIndex: props.Data.zIndex + 1,
    });
  };
  const MoveLayerDown = () => {
    ref.set({
      LayerName: props.Data.LayerName,
      BackgroundColor: props.Data.BackgroundColor,
      SizeW: props.Data.SizeW,
      SizeH: props.Data.SizeH,
      PositionX: props.Data.PositionX,
      PositionY: props.Data.PositionY,
      zIndex: props.Data.zIndex - 1,
    });
  };

  return (
    <div onClick={FocusLayer} style={border} className={style.Layer}>
      <span
        className={style.Layer_color}
        style={{ backgroundColor: props.Data.BackgroundColor }}
      />
      {props.Data.LayerName}
      <div className={style.Layer_Controls}>
        <p className={style.Layer_Number}>{props.Data.zIndex}</p>
        <div className={style.Layer_Arrow}>
          <i onClick={MoveLayerUp} className="fas fa-caret-up"></i>
          <i onClick={MoveLayerDown} className="fas fa-sort-down"></i>
        </div>
        <span className={style.Layer_Delete} onClick={() => DeleteItem()}>
          <i class="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default Layer;
