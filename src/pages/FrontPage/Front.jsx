import React, { useState, useEffect } from "react";

import style from "./Front.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import { firebase } from "../../global/Firebase/config";

const FrontPage = () => {
  const [GetData, setGetData] = useState(null);

  const ref = firebase
    .firestore()
    .collection("Artboard")
    .doc("Testboard")
    .collection("Layers");

  const onCollection = (querySnapshot) => {
    const Data = [];
    querySnapshot.forEach((doc) => {
      const {
        LayerName,
        BackgroundColor,
        PositionX,
        PositionY,
        SizeH,
        SizeW,
        zIndex,
      } = doc.data();
      Data.push({
        id: doc.id,
        LayerName,
        BackgroundColor,
        PositionX,
        PositionY,
        SizeH,
        SizeW,
        zIndex,
      });
      setGetData({
        Data,
      });
    });
  };

  useEffect(() => {
    ref.onSnapshot(onCollection);
    // eslint-disable-next-line
  }, []);

  const [LayerId, setLayerId] = useState("Layer1");
  return (
    <div className={style.Front}>
      {GetData ? (
        <div className={style.Front_Container}>
          <Header />
          <Layers GetLayerId={setLayerId} Data={GetData.Data} id={GetData.id} />
          <Drawingboard GetLayerId={setLayerId} Data={GetData.Data} />
          <EditLayers Id={LayerId} />
        </div>
      ) : null}
    </div>
  );
};

export default FrontPage;
