import React from "react";

const Delete = (props) => {
  return (
    <span className={style.Layer_Delete} onClick={() => DeleteItem()}>
      <i className="fas fa-trash-alt"></i>
    </span>
  );
};

export default Delete;
