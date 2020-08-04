import React from "react";
import style from "./Drawingboard.module.scss";
import useMouse from "@react-hook/mouse-position";
// import Artboard from "./Artboard";
import Box from "./Box.jsx";

const Drawingboard = (props) => {
  const TrackMouse = React.useRef(null);
  const mouse = useMouse(TrackMouse, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  return (
    <div ref={TrackMouse} className={style.Drawingboard}>
      {/* <Artboard> */}
      <div>
        {props.Data
          ? props.Data.map(
              ({
                LayerName,
                id,
                zIndex,
                BackgroundColor,
                PositionX,
                PositionY,
                SizeW,
                SizeH,
              }) => (
                <Box
                  ArtboardID={props.ArtboardID}
                  LayerName={LayerName}
                  Focus={props.GetLayerId}
                  key={id}
                  Id={id}
                  zIndex={zIndex}
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
      {/* </Artboard> */}
    </div>
  );
};

export default Drawingboard;
