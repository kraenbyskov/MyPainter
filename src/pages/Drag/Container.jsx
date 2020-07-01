import React, { useState } from "react";
import Card from "./card";
import update from "immutability-helper";
const style = {
  width: 400,
};
const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "i'm 1",
    },
    {
      id: 2,
      text: "i'm 2",
    },
    {
      id: 3,
      text: "i'm 3",
    },
    {
      id: 4,
      text: "i'm 4",
    },
    {
      id: 5,
      text: "i'm 5",
    },
  ]);
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
    <div style={style}>
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default Container;
