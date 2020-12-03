import React from "react";
import { StoreContext } from "../../context/StoreContext";
import { observer } from "mobx-react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 75px;
    grid-area: header;
    display: flex;
    gap:30px;
    justify-content: center;
    align-items: center;

    h3,
    p, i {
        color: white;
        text-align: center;
    }


`


const Header = observer(() => {
  const { ArtboardSelection, setSelectArtboard } = React.useContext(StoreContext);
  return (
    <HeaderContainer >
      <h3>Artboard : {ArtboardSelection}</h3>
      <span onClick={() => {
        setSelectArtboard(true)
      }}>
        <i className="far fa-clipboard"></i>
      </span>
    </HeaderContainer>
  );
});


export default Header;