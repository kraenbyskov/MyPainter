import React, { useState, useEffect } from "react";
import style from "./Layers.module.scss";
import Layer from "./Layer";
import update from "immutability-helper";
import AddLayer from "../../global/AddLayer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StoreContext } from "../../context/StoreContext";

const Layers = (props) => {
  const [cards, setCards] = useState(props.Data);
  const store = React.useContext(StoreContext);
  const ArtboardSelection = store.ArtboardSelection;
  useEffect(() => {
    setCards(props.Data);
  }, [props]);

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
                ArtboardId={ArtboardSelection}
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
        <span onClick={() => AddLayer(ArtboardSelection)}>
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default Layers;
