import React, { useState, useEffect } from "react";

import style from "./Artboard.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import { firebase } from "../../global/Firebase/config";

import "firebase/auth";



const setData = (ArtboardSelection, setGetData) => {
  if (ArtboardSelection) {
    const ref = firebase
      .firestore()
      .collection("Artboard")
      .doc(ArtboardSelection)
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
    ref.onSnapshot(onCollection);

  } else {
    console.log("no Artboard Selectet")
  }

}

const Artboard = ({ ArtboardSelection }) => {
  const [GetData, setGetData] = useState(null);

  useEffect(() => {
    setData(ArtboardSelection, setGetData)
  }, [ArtboardSelection,]);

  const [LayerId, setLayerId] = useState();
  return (
    <div className={style.Front}>
      <div className={style.Front_Container}>
        <Header ArtboardID={ArtboardSelection} />
        <Layers
          ArtboardID={ArtboardSelection}
          GetLayerId={setLayerId}
          Data={GetData && GetData.Data}
          id={GetData && GetData.id}
        />
        <Drawingboard
          ArtboardID={ArtboardSelection}
          GetLayerId={setLayerId}
          Data={GetData && GetData.Data}
        />
        <EditLayers ArtboardID={ArtboardSelection} Id={LayerId} />
      </div>
    </div>
  );
};



export default Artboard
