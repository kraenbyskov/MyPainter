import React, { useImperativeHandle, useRef, useState } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { firebase } from "../../global/Firebase/config";
import { ItemTypes } from "./ItemTypes";
import style from "./Layers.module.scss";

const Card = React.forwardRef(
  (
    { ArtboardId, Focus, Data, index, connectDragSource, connectDropTarget },
    ref
  ) => {
    const FocusLayer = () => {
      Focus(Data.id);
    };

    const [Name, setName] = useState(Data.LayerName);

    const firebaseRef = firebase
      .firestore()
      .collection("Artboard")
      .doc(ArtboardId)
      .collection("Layers")
      .doc(Data.id);

    const DeleteItem = () => {
      firebaseRef.delete();
    };

    const onChange = (e, setState) => {
      setState(e.target.value);
    };

    const onKeyPress = (e) => {
      if (e.which === 13 || e.keyCode === 13) {
        firebaseRef.update({
          LayerName: e.target.value,
        });
      }
    };
    const OnBlur = (e) => {
      firebaseRef.update({
        LayerName: e.target.value,
      });
    };

    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return (
      <div
        ref={elementRef}
        onClick={FocusLayer}
        style={{ borderLeft: "4px solid" + Data.BackgroundColor }}
        className={style.Layer}
      >
        <input
          onChange={(e) => onChange(e, setName)}
          value={Name ? Name : null}
          onKeyPress={(event) => onKeyPress(event)}
          onBlur={(event) => OnBlur(event)}
        />
        <div className={style.Layer_Controls}>
          <p className={style.Layer_Number}>{index} </p>
          <p className={style.Layer_Number}> {Data.zIndex}</p>
          <span className={style.Layer_Delete} onClick={() => DeleteItem()}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      </div>
    );
  }
);
export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Card)
);
