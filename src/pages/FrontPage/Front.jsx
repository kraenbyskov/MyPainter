import React, { useState, useEffect } from "react";

import style from "./Front.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import CollectData from "../../global/CollectData/CollectData";
import { firebase } from "../../global/Firebase/config";

const FrontPage = () => {
  const [GetData, setGetData] = useState(null);
  // const [HaveFocus, setHaveFocus] = useState(false);

  // const ref = firebase
  //   .firestore()
  //   .collection("Users")
  //   .doc("Kræn Byskov")
  //   .collection("Pages");

  // // console.log(GetData);

  // const onCollection = (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     setGetData(doc.data());
  //   });
  // };

  useEffect(() => {
    CollectData({ setState: setGetData });
  }, []);
  if (GetData) {
    console.log(GetData);
  }

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
