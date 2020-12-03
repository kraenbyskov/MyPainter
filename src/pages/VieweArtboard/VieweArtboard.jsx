import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';


import style from "./VieweArtboard.module.scss";
import { firebase } from "../../global/Firebase/config";
import Board from "./Board";
import NewArtboard from "./NewArtboard";
// import Login from "../../components/Login/Login";
import "firebase/auth";
import { StoreContext } from "../../context/StoreContext";
import { observer } from "mobx-react";

const VieweArtboard = observer(() => {
  const [GetData, setGetData] = useState(null);
  const [NewArtboardButton, setNewArtboardButton] = useState(false);
  const { setArtboardSelection, setSelectArtboard, SelectArtboard } = React.useContext(StoreContext);


  const ref = firebase.firestore().collection("Artboard");

  const onCollection = (querySnapshot) => {


    const Data = [];
    querySnapshot.forEach((doc) => {
      const { ArtboardName, Users } = doc.data();
      Data.push({
        id: doc.id,
        ArtboardName,
        Users,
      });
      setGetData({
        Data,
      });
    });
  };

  const DeleteItem = (ArtborardName) => {
    ref.doc(ArtborardName).delete();
  };

  useEffect(() => {
    ref.onSnapshot(onCollection);
    // eslint-disable-next-line
  }, []);

  return (

    <Popup
      modal
      open={SelectArtboard}
      nested
    >
      <div className="modal" style={{ width: "100%" }}>
        <div className={style.VieweArtboard}>
          <div className={style.Boards}>
            {GetData
              ? GetData.Data.map(({ ArtboardName, Users, id }) => (
                <Board key={id}>
                  <span
                    className={style.ArtboardDelete}
                    onClick={() => DeleteItem(id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <h2>{ArtboardName}</h2>
                  <p>Users:</p>
                  {Users.map((user) => (
                    <p key={user}>{user}</p>
                  ))}
                  <span onClick={() => {
                    setSelectArtboard(false)
                    setArtboardSelection(ArtboardName)
                  }} className={style.Board_button}>
                    Go to Artboard
                </span>


                </Board>
              ))
              : null}
            <div className={style.AddBoardButton}>
              <i
                onClick={() => {
                  setNewArtboardButton(true)
                }}
                className="fas fa-plus-circle"
              ></i>
            </div>
          </div>

          {NewArtboardButton ? <NewArtboard isOpen={setNewArtboardButton} /> : null}
        </div>

      </div>

    </Popup>

  );
});

export default VieweArtboard;
