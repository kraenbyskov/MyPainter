import React from "react";
import style from "./Drawingboard.module.scss";
import useMouse from "@react-hook/mouse-position";
import Box from "./Box.jsx";
import { StoreContext } from "../../context/StoreContext";

const Artboard = (props) => {
  return <div className={style.Artboard}> {props.children}</div>;
};

const Drawingboard = ({ Data, GetLayerId, ActiveLayerID }) => {

  const store = React.useContext(StoreContext);
  const ArtboardSelection = store.ArtboardSelection;
  const TrackMouse = React.useRef(null);
  const mouse = useMouse(TrackMouse, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  return (
    <div className={style.Drawingboard}>
      <Artboard>
        <div className={style.ArtboardContainer} ref={TrackMouse}>
          {Data
            ? Data.map(
              ({
                LayerName,
                id,
                zIndex,
                BackgroundColor,
                PositionX,
                PositionY,
                BorderRadius,
                SizeW,
                SizeH,
              }) => (
                  <Box
                    ArtboardID={ArtboardSelection}
                    LayerName={LayerName}
                    Focus={GetLayerId}
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
                    BorderRadius={BorderRadius}
                    ActiveLayerID={ActiveLayerID}
                  />
                )
            )
            : null}
        </div>
      </Artboard>
    </div>
  );
};

export default Drawingboard;
