import React, { useState, useEffect } from "react";
import CollectData from "../../global/CollectData/CollectData";

import { firebase } from "../../global/Firebase/config";

export default function Drag() {
  const [GetData, setGetData] = useState(null);
  // const [HaveFocus, setHaveFocus] = useState(false);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Hans")
    .collection("Pages");

  const AddLayer = () => {
    ref.doc("3KXlWRbGTglGFsMDJbwV").set({
      layers: GetData.layers,
    });
  };
  console.log(GetData);

  const onCollection = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setGetData(doc.data());
    });
  };

  useEffect(() => {
    ref.onSnapshot(onCollection);
  }, []);

  return (
    <div>
      <h1 onClick={AddLayer}>hey</h1>
      {/* {GetData ? GetData.layers.map((data) => <p>{data.LayerName}</p>) : null} */}
    </div>
  );
}
