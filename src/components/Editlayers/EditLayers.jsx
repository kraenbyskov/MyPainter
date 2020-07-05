import React, { useState, useEffect } from "react";
import style from "./EditLayers.module.scss";
import { firebase } from "../../global/Firebase/config";
import { SketchPicker } from "react-color";
import InputFields from "./inputFields";

const EditLayers = (props) => {
  const [BackgroundColor, setBackgroundColor] = useState({
    background: "#FFFFFF",
  });
  const [SizeW, setSizeW] = useState(null);
  const [SizeH, setSizeH] = useState(null);
  const [PositionX, setPositionX] = useState(null);
  const [PositionY, setPositionY] = useState(null);
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
        setBackgroundColor({ background: board.BackgroundColor });
        setSizeW(board.SizeW);
        setSizeH(board.SizeH);
        setPositionX(board.PositionX);
        setPositionY(board.PositionY);
      } else {
        console.log("No such document!");
      }
    });
    // eslint-disable-next-line
  }, [props]);

  const onChange = (e, setState, type) => {
    setState(e.target.value);
    ref.update({
      [type]: e.target.value,
    });
  };

  const handleChangeComplete = (color) => {
    setBackgroundColor({ background: color.hex });
    ref.update({
      BackgroundColor: color.hex,
    });
  };

  const handleClick = () => {
    setdisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setdisplayColorPicker(false);
  };

  const Position = [
    {
      Name: "X",
      state: "PositionX",
      Value: PositionX,
      Change: setPositionX,
    },
    {
      Name: "Y",
      state: "PositionY",
      Value: PositionY,
      Change: setPositionY,
    },
  ];
  const Size = [
    {
      Name: "W",
      state: "SizeW",
      Value: SizeW,
      Change: setSizeW,
    },
    {
      Name: "H",
      state: "SizeH",
      Value: SizeH,
      Change: setSizeH,
    },
  ];

  return (
    <div className={style.EditLayers}>
      <div className={style.EditLayers_Controls}>
        <p>Position</p>
        {Position.map(({ Name, Value, Change, state }) => (
          <InputFields
            key={Name}
            Name={Name}
            Value={Value}
            Change={Change}
            state={state}
            onChange={onChange}
          />
        ))}
      </div>
      <div className={style.EditLayers_Controls}>
        <p>Size</p>
        {Size.map(({ Name, Value, Change, state }) => (
          <InputFields
            key={Name}
            Name={Name}
            Value={Value}
            Change={Change}
            state={state}
            onChange={onChange}
          />
        ))}
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
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditLayers;
