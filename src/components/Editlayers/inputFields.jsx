import React from "react";
import style from "./EditLayers.module.scss";

const InputFields = (props) => {
  return (
    <div className={style.EditLayers_Controls_input}>
      <p>{props.Name}</p>
      <input
        value={props.Value ? props.Value : "no Data"}
        type="number"
        name="Width"
        onChange={(e) => props.onChange(e, props.Change, props.state)}
      />
    </div>
  );
};

export default InputFields;
