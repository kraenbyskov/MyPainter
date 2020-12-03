
import React from "react";
import { useLocalStore } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        ArtboardSelection: localStorage.getItem("ArtboardSelection"),
        // SelectArtboard: true,
        SelectArtboard: localStorage.getItem("ArtboardSelection") === null ? true : false,
        setArtboardSelection: (input) => {
            store.ArtboardSelection = input;
            localStorage.setItem("ArtboardSelection", input);
        },

        setSelectArtboard: (input) => {
            store.SelectArtboard = input;
        }

    }));
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};


export { StoreProvider, StoreContext }