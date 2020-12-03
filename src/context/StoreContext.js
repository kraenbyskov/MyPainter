
import React from "react";
import { useLocalStore } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        ArtboardSelection: localStorage.getItem("ArtboardSelection"),
        setArtboardSelection: (input) => {
            store.ArtboardSelection = input;
            localStorage.setItem("ArtboardSelection", input);
        },

    }));
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};


export { StoreProvider, StoreContext }