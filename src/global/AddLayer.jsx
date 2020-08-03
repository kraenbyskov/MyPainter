import { firebase } from "./Firebase/config";

const AddLayer = () => {
  const ref = firebase
    .firestore()
    .collection("Artboard")
    .doc("Testboard")
    .collection("Layers");

  ref.doc().set({
    BackgroundColor: "#FF0000",
    LayerName: "New Layer",
    PositionX: 250,
    PositionY: 250,
    SizeH: 100,
    SizeW: 100,
    zIndex: 1,
  });
};

export default AddLayer;
