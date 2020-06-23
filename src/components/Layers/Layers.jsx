import React, { useState, useEffect } from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";
import Layer from "./Layer";

const Layers = (props) => {
  const [Layers, setLayers] = useState(null);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

  const onCollection = (querySnapshot) => {
    const Layer = [];
    querySnapshot.forEach((doc) => {
      const { LayerName, BackgroundColor } = doc.data();
      // console.log(doc.id);
      Layer.push({
        id: doc.id,
        LayerName,
        BackgroundColor,
      });
      setLayers({
        Layer,
      });
    });
  };

  useEffect(() => {
    ref.onSnapshot(onCollection);
    // eslint-disable-next-line
  }, []);

  const AddLayer = () => {
    ref.doc("Layer3").set({
      BackgroundColor: "#0000FF",
      LayerName: "Box3",
      PositionX: 300,
      PositionY: 350,
      SizeH: 200,
      SizeW: 100,
    });
  };

  return (
    <div className={style.Layers}>
      <h2>Layers</h2>
      {Layers
        ? Layers.Layer.map(({ BackgroundColor, LayerName, id }) => (
            <Layer
              Focus={props.GetLayerId}
              key={LayerName}
              Name={LayerName}
              id={id}
              Color={BackgroundColor}
            />
          ))
        : null}
      <div className={style.Layers_Add}>
        <p>Add Layer</p>
        <span onClick={() => AddLayer()}>+</span>
      </div>
    </div>
  );
};

export default Layers;
