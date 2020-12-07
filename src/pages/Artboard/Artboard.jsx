import React, { useState, useEffect } from "react";

import style from "./Artboard.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import { firebase } from "../../global/Firebase/config";

import "firebase/auth";
import { StoreContext } from "../../context/StoreContext";
import { observer } from "mobx-react";


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
          BorderRadius,
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
          BorderRadius,
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

const Artboard = observer(() => {
  const [GetData, setGetData] = useState(null);
  const store = React.useContext(StoreContext);
  const ArtboardSelection = store.ArtboardSelection;


  useEffect(() => {
    setData(ArtboardSelection, setGetData)
  }, [ArtboardSelection,]);

  const [LayerId, setLayerId] = useState();
  return (
    <div className={style.Front}>
      <div className={style.Front_Container}>
        <Header />
        <Layers

          GetLayerId={setLayerId}
          Data={GetData && GetData.Data}
          id={GetData && GetData.id}
        />
        <Drawingboard

          GetLayerId={setLayerId}
          Data={GetData && GetData.Data}
          ActiveLayerID={LayerId}
        />
        <EditLayers Id={LayerId} />
      </div>
    </div>
  );
});



export default Artboard
