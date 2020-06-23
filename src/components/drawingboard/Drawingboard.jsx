import React, { useState, useEffect } from "react";
import style from "./Drawingboard.module.scss";
import { firebase } from "../../global/Firebase/config";
import useMouse from "@react-hook/mouse-position";
import Box from "./Box.jsx";

const Drawingboard = () => {
  const TrackMouse = React.useRef(null);
  const mouse = useMouse(TrackMouse, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const [Layers, setLayers] = useState(null);

  const GetData = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

  const onCollection = (querySnapshot) => {
    const Layer = [];
    querySnapshot.forEach((doc) => {
      const {
        LayerName,
        BackgroundColor,
        PositionX,
        PositionY,
        SizeH,
        SizeW,
      } = doc.data();
      Layer.push({
        id: doc.id,
        LayerName,
        BackgroundColor,
        PositionX,
        PositionY,
        SizeH,
        SizeW,
      });
      setLayers({
        Layer,
      });
    });
  };

  useEffect(() => {
    GetData.onSnapshot(onCollection);
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={TrackMouse} className={style.Drawingboard}>
      {Layers
        ? Layers.Layer.map(
            ({ BackgroundColor, PositionX, PositionY, SizeH, SizeW, id }) => (
              <Box
                key={id}
                X={mouse.x}
                Y={mouse.y}
                BackgroundColor={BackgroundColor}
                PositionX={PositionX}
                PositionY={PositionY}
                SizeH={SizeH}
                SizeW={SizeW}
              />
            )
          )
        : null}
    </div>
  );
};

export default Drawingboard;
