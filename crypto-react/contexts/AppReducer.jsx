import { Action } from "./AppActions";

export const appReducer = (state, action) => {
    switch (action.type) {
        case Action.OPEN_MENU: {
            const newState = { ...state, isMenuOpen: true };
            return newState;
        }
        case Action.CLOSE_MENU: {
            const newState = { ...state, isMenuOpen: false };
            return newState;
        }
        case Action.TOGGLE_SCROLL: {
            const newState = { ...state, isScrolled: action.payload };
            return newState;
        }
        default: {
            return state;
        }
    }
};
