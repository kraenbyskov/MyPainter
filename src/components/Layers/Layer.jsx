import React, { useState } from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";

const Layer = (props) => {
  const [Name, setName] = useState(props.Data.LayerName);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages")
    .doc(props.Data.id);

  const DeleteItem = () => {
    ref.delete();
  };

  const FocusLayer = () => {
    props.Focus(props.Data.id);
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

  const onChange = (e, setState) => {
    setState(e.target.value);
  };

  const onKeyPress = (e) => {
    //See notes about 'which' and 'key'
    if (e.which === 13 || e.keyCode === 13) {
      ref.set({
        LayerName: e.target.value,
        BackgroundColor: props.Data.BackgroundColor,
        SizeW: props.Data.SizeW,
        SizeH: props.Data.SizeH,
        PositionX: props.Data.PositionX,
        PositionY: props.Data.PositionY,
        zIndex: props.Data.zIndex,
      });
    }
  };
  const OnBlur = (e) => {
    ref.set({
      LayerName: e.target.value,
      BackgroundColor: props.Data.BackgroundColor,
      SizeW: props.Data.SizeW,
      SizeH: props.Data.SizeH,
      PositionX: props.Data.PositionX,
      PositionY: props.Data.PositionY,
      zIndex: props.Data.zIndex,
    });
  };

  return (
    <div
      onClick={FocusLayer}
      style={{ borderLeft: "4px solid" + props.Data.BackgroundColor }}
      className={style.Layer}
    >
      <input
        onChange={(e) => onChange(e, setName)}
        value={Name ? Name : null}
        onKeyPress={(event) => onKeyPress(event)}
        onBlur={(event) => OnBlur(event)}
      />
      <div className={style.Layer_Controls}>
        <p className={style.Layer_Number}>{props.Data.zIndex}</p>
        <div className={style.Layer_Arrow}>
          <i onClick={MoveLayerUp} className="fas fa-caret-up"></i>
          <i onClick={MoveLayerDown} className="fas fa-sort-down"></i>
        </div>
        <span className={style.Layer_Delete} onClick={() => DeleteItem()}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default Layer;
