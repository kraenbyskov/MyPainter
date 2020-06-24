import React from "react";
import style from "./Drawingboard.module.scss";
import useMouse from "@react-hook/mouse-position";
import Box from "./Box.jsx";

const Drawingboard = (props) => {
  const TrackMouse = React.useRef(null);
  const mouse = useMouse(TrackMouse, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  return (
    <div ref={TrackMouse} className={style.Drawingboard}>
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
                LayerName={LayerName}
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
  );
};

export default Drawingboard;
