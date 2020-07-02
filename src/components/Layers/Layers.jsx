import React, { useState } from "react";
import style from "./Layers.module.scss";
import { firebase } from "../../global/Firebase/config";
import Layer from "./Layer";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Layers = (props) => {
  // let sorted = null;
  // if (props) {
  //   sorted = props.Data.sort((a, b) => a["zIndex"] - b["zIndex"]);
  // }

  const [cards, setCards] = useState(props.Data);

  const ref = firebase
    .firestore()
    .collection("Users")
    .doc("Kræn Byskov")
    .collection("Pages");

  const AddLayer = () => {
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

  // const onBlur = () => {
  //   for (const [index, value] of cards.entries()) {
  //     ref.doc(value.id).set({
  //       BackgroundColor: value.BackgroundColor,
  //       LayerName: value.LayerName,
  //       PositionX: value.PositionX,
  //       PositionY: value.PositionY,
  //       SizeH: value.SizeH,
  //       SizeW: value.SizeW,
  //       zIndex: value.zIndex,
  //     });
  //   }
  // };

  // const OnBlur = () => {
  //   ref.set({
  //     cards,
  //   });
  // };

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  return (
    <div className={style.Layers}>
      {/* <p onClick={onBlur}>Add new order</p> */}
      <DndProvider backend={HTML5Backend}>
        <div className={style.Layers_Container}>
          {cards
            ? cards.map((Data, i) => (
                <Layer
                  key={Data.id}
                  index={i}
                  id={Data.id}
                  text={Data.text}
                  moveCard={moveCard}
                  Focus={props.GetLayerId}
                  Data={Data}
                  AllData={cards}
                  // OnBlur={onBlur}
                />
              ))
            : null}
        </div>
      </DndProvider>

      <div className={style.Layers_Add}>
        <p>Add Layer</p>
        <span onClick={() => AddLayer()}>
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default Layers;
