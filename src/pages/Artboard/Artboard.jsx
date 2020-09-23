import React, { useState, useEffect } from "react";

import style from "./Artboard.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import { firebase } from "../../global/Firebase/config";

import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";

const Artboard = (props) => {
  const [GetData, setGetData] = useState(null);
  const { signInWithGoogle } = props;

  const ref = firebase
    .firestore()
    .collection("Artboard")
    .doc(props.match.params.id)
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
          <Header ArtboardID={props.match.params.id} />
          <Layers
            ArtboardID={props.match.params.id}
            GetLayerId={setLayerId}
            Data={GetData.Data}
            id={GetData.id}
          />
          <Drawingboard
            ArtboardID={props.match.params.id}
            GetLayerId={setLayerId}
            Data={GetData.Data}
          />
          <EditLayers ArtboardID={props.match.params.id} Id={LayerId} />
        </div>
      ) : null}
    </div>
  );
};

const firebaseAppAuth = firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Artboard);
