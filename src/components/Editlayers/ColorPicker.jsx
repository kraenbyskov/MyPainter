import React, { useState } from "react";

import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const [HexColor, setHexColor] = useState({
    background: "#fff",
  });

  console.log(HexColor);

  const handleChangeComplete = (color) => {
    setHexColor({ background: color.hex });
  };

  return (
    <SketchPicker
      color={HexColor.background}
      onChangeComplete={handleChangeComplete}
    />
  );
};

export default ColorPicker;
