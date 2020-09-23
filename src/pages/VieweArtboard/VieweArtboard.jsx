import React, { useState, useEffect } from "react";

import style from "./VieweArtboard.module.scss";
import { firebase } from "../../global/Firebase/config";
import { Link } from "react-router-dom";
import Board from "./Board";
import NewArtboard from "./NewArtboard";
// import Login from "../../components/Login/Login";
import "firebase/auth";

const VieweArtboard = (props) => {
  const [GetData, setGetData] = useState(null);
  const [NewArtboardButton, setNewArtboardButton] = useState(false);
  console.log(props);

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
    <div className={style.VieweArtboard}>
      {/* <div className={style.VieweArtboard_header}>
        <Login />
      </div> */}
      <h1>See Artboards</h1>
      <p style={{ textAlign: "center", color: "white" }}>
        here you can see artboards or add new ones by click the plus
      </p>
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
                <Link to={`/Artboard/${id}`} className={style.Board_button}>
                  Go to Artboard
                </Link>
              </Board>
            ))
          : null}
        <div className={style.AddBoardButton}>
          <i
            onClick={() => setNewArtboardButton(true)}
            className="fas fa-plus-circle"
          ></i>
        </div>
      </div>

      {NewArtboardButton ? <NewArtboard isOpen={setNewArtboardButton} /> : null}
    </div>
  );
};

export default VieweArtboard;
