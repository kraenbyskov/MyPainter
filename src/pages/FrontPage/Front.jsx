import React, { useState, useEffect } from "react";

import style from "./Front.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import CollectData from "../../components/CollectData/CollectData";

const FrontPage = () => {
  const [GetData, setGetData] = useState(null);

  useEffect(() => {
    CollectData({ setState: setGetData });
  }, []);
  if (GetData) {
    // console.log(GetData);
  }
  const [LayerId, setLayerId] = useState("Layer1");
  return (
    <div className={style.Front}>
      {GetData ? (
        <div>
          <EditLayers Id={LayerId} />
          <Drawingboard Data={GetData.Data} />
          <Layers GetLayerId={setLayerId} Data={GetData.Data} id={GetData.id} />
        </div>
      ) : null}
    </div>
  );
};

export default FrontPage;
