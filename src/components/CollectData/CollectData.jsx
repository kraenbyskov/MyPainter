import { firebase } from "../../global/Firebase/config";

const CollectData = (props) => {
  const GetData = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

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
      props.setState({
        Data,
      });
    });
  };

  GetData.onSnapshot(onCollection);
};

export default CollectData;
