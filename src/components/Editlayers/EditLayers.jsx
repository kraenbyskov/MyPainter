import React, { useState, useEffect } from "react";
import style from "./EditLayers.module.scss";
import { firebase } from "../../global/Firebase/config";
import { SketchPicker } from "react-color";

const EditLayers = (props) => {
  const [LayerName, setLayerName] = useState(null);
  const [BackgroundColor, setBackgroundColor] = useState({
    background: "#FFFFFF",
  });
  const [SizeW, setSizeW] = useState(null);
  const [SizeH, setSizeH] = useState(null);
  const [PositionX, setPositionX] = useState(null);
  const [PositionY, setPositionY] = useState(null);
  const [zIndex, setzIndex] = useState(null);
  const [displayColorPicker, setdisplayColorPicker] = useState(false);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages")
    .doc(props.Id);

  useEffect(() => {
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        setLayerName(board.LayerName);
        setBackgroundColor({ background: board.BackgroundColor });
        setSizeW(board.SizeW);
        setSizeH(board.SizeH);
        setzIndex(board.zIndex);
        setPositionX(board.PositionX);
        setPositionY(board.PositionY);
      } else {
        console.log("No such document!");
      }
    });
    // eslint-disable-next-line
  }, [props.Id]);

  const onChangeX = (e, setState) => {
    setState(e.target.value);
    ref.set({
      LayerName: LayerName,
      BackgroundColor: BackgroundColor,
      SizeW: SizeW,
      SizeH: SizeH,
      PositionX: e.target.value,
      PositionY: PositionY,
      zIndex,
    });
  };
  const onChangeY = (e, setState) => {
    setState(e.target.value);
    ref.set({
      LayerName: LayerName,
      BackgroundColor: BackgroundColor,
      SizeW: SizeW,
      SizeH: SizeH,
      PositionX: PositionX,
      PositionY: e.target.value,
      zIndex,
    });
  };
  const onChangeW = (e, setState) => {
    setState(e.target.value);
    ref.set({
      LayerName: LayerName,
      BackgroundColor: BackgroundColor,
      SizeW: e.target.value,
      SizeH: SizeH,
      PositionX: PositionX,
      PositionY: PositionY,
      zIndex,
    });
  };
  const onChangeH = (e, setState) => {
    setState(e.target.value);
    ref.set({
      LayerName: LayerName,
      BackgroundColor: BackgroundColor,
      SizeW: SizeW,
      SizeH: e.target.value,
      PositionX: PositionX,
      PositionY: PositionY,
      zIndex,
    });
  };

  const handleChangeComplete = (color) => {
    setBackgroundColor({ background: color.hex });
    ref.set({
      LayerName: LayerName,
      BackgroundColor: color.hex,
      SizeW: SizeW,
      SizeH: SizeH,
      PositionX: PositionX,
      PositionY: PositionY,
      zIndex,
    });
  };

  const handleClick = () => {
    setdisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setdisplayColorPicker(false);
  };

  return (
    <div className={style.EditLayers}>
      <div className={style.EditLayers_Controls}>
        <p>Position</p>
        <div className={style.EditLayers_Controls_input}>
          <p>X</p>
          <input
            value={PositionX ? PositionX : "no value"}
            type="number"
            name="Width"
            onChange={(e) => onChangeX(e, setPositionX)}
          />
        </div>
        <div className={style.EditLayers_Controls_input}>
          <p>Y</p>
          <input
            value={PositionY ? PositionY : "no value"}
            type="number"
            name="Width"
            onChange={(e) => onChangeY(e, setPositionY)}
          />
        </div>
      </div>
      <div className={style.EditLayers_Controls}>
        <p>Size</p>
        <div className={style.EditLayers_Controls_input}>
          <p>W</p>
          <input
            value={SizeW ? SizeW : "no value"}
            type="number"
            name="Width"
            onChange={(e) => onChangeW(e, setSizeW)}
          />
        </div>

        <div className={style.EditLayers_Controls_input}>
          <p>H</p>
          <input
            value={SizeH ? SizeH : "no value"}
            type="number"
            name="Height"
            onChange={(e) => onChangeH(e, setSizeH)}
          />
        </div>
      </div>
      <h2>Fill</h2>
      <div className={style.EditLayers_Controls}>
        <p>Background Color</p>
        <span
          onClick={handleClick}
          style={{
            backgroundColor: BackgroundColor
              ? BackgroundColor.background
              : "#FFFFFF",
          }}
        />
      </div>

      <div className={style.EditLayers_Controls_colorPicker}>
        {displayColorPicker ? (
          <div>
            <div
              className={style.EditLayers_Controls_colorPicker_closeButton}
              onClick={handleClose}
            />
            <SketchPicker
              color={BackgroundColor.background}
              onChangeComplete={handleChangeComplete}
              disableAlpha={true}
              presetColors={[{ color: "#f00", title: "red" }]}
              width={"100%"}
              style={{ background: "green" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditLayers;
