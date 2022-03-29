import React, { createContext, useContext, useReducer } from "react";
import { appReducer } from "./AppReducer";

const initialState = {
    isMenuOpen: false,
    isScrolled: false,
};

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [appContext, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ appContext, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
