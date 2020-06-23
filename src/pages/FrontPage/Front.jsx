import React, { useState } from "react";
import style from "./Front.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";

const FrontPage = () => {
  const [LayerId, setLayerId] = useState("Layer1");
  return (
    <div className={style.Front}>
      <EditLayers Id={LayerId} />
      <Drawingboard />
      <Layers GetLayerId={setLayerId} />
    </div>
  );
};

export default FrontPage;
