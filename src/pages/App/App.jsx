import React, { useState, useEffect } from "react";

import style from "./App.module.scss";
import Drawingboard from "../../components/drawingboard/Drawingboard";
import Layers from "../../components/Layers/Layers";
import EditLayers from "../../components/Editlayers/EditLayers";
import Header from "../../components/Header/Header";
import { firebase } from "../../global/Firebase/config";

import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";

const App = (props) => {
  const [GetData, setGetData] = useState(null);
  const [IsLogin, setIsLogin] = useState(null);
  const { signInWithGoogle, signOut } = props;
  console.log(props);

  const DocumentId = "dsadsa";

  const ref = firebase
    .firestore()
    .collection("Artboard")
    .doc(DocumentId)
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
  useEffect(() => {
    props.user ? setIsLogin(true) : setIsLogin(false);
  }, [props.user, IsLogin]);

  const [LayerId, setLayerId] = useState("Layer1");
  return (
    <div className={style.Front}>
      <div className={style.Front_Container}>
        <Header
          signOut={signOut}
          signInWithGoogle={signInWithGoogle}
          ArtboardID={DocumentId}
          user={props.user ? props.user : null}
        />
        <Layers
          ArtboardID={DocumentId}
          GetLayerId={setLayerId}
          Data={GetData ? GetData.Data : null}
          id={GetData ? GetData.id : null}
        />
        <Drawingboard
          ArtboardID={DocumentId}
          GetLayerId={setLayerId}
          Data={GetData ? GetData.Data : null}
        />
        <EditLayers ArtboardID={DocumentId} Id={LayerId} />
      </div>
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
})(App);
